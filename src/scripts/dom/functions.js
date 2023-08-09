import Ship from "../Ship";
import game from "./game";

const functions = (() => {
    function displayShips(player, grid) {
        const playerGrid = document.querySelector(grid);
        const gridCells = playerGrid.querySelectorAll(".grid-cell");

        gridCells.forEach((cell) => {
            cell.classList.remove("ship");
        });
        player.gameBoard.coordsShips.forEach((coords) => {
            const x = coords[0];
            const y = coords[1];
            const index = x * 10 + y; // assuming a 10x10 grid
            const cell = gridCells[index];
            if (cell) {
                cell.classList.add("ship");
            }
        });
    }

    function displayHits(player, grid) {
        const playerGrid = document.querySelector(grid);
        const gridCells = playerGrid.querySelectorAll(".grid-cell");

        gridCells.forEach((cell) => {
            cell.classList.remove("hit");
        });
        player.gameBoard.successfulAttacks.forEach((coords) => {
            const x = coords[0];
            const y = coords[1];
            const index = x * 10 + y; // assuming a 10x10 grid
            const cell = gridCells[index];
            if (cell) {
                cell.classList.add("hit");
            }
        });
        player.gameBoard.missedAttacks.forEach((coords) => {
            const x = coords[0];
            const y = coords[1];
            const index = x * 10 + y; // assuming a 10x10 grid
            const cell = gridCells[index];
            if (cell) {
                cell.classList.add("miss");
            }
        });
    }

    function placeShipsManually() {
        let playerGrid = document.querySelector("#player-grid");
        const newPlayerGrid = playerGrid.cloneNode(true);
        playerGrid.parentNode.replaceChild(newPlayerGrid, playerGrid);
        playerGrid = newPlayerGrid;
        const gridCells = playerGrid.querySelectorAll(".grid-cell");
        const changeOrientation = document.querySelector("#change-orientation");
        changeOrientation.classList.remove("hidden");
        let orientation = "h";
        changeOrientation.addEventListener("click", () => {
            orientation = orientation === "h" ? "v" : "h";
        });
        const possibleShipLengths = [5, 4, 3, 3, 2];
        let currentShipIndex = 0;

        gridCells.forEach((cell) => {
            cell.addEventListener("mouseover", function highlightCells() {
                const x = parseInt(cell.getAttribute("data-x"));
                const y = parseInt(cell.getAttribute("data-y"));

                for (let i = 0; i < possibleShipLengths[currentShipIndex]; i++) {
                    const targetX = orientation === "h" ? x : x + i;
                    const targetY = orientation === "h" ? y + i : y;

                    const targetCell = document.querySelector(
                        `.grid-cell[data-x="${targetX}"][data-y="${targetY}"]`,
                    );

                    if (targetCell) {
                        targetCell.style.backgroundColor = "rgb(139,22,217)"; // purple with 0.5 opacity
                    }
                }
            });

            cell.addEventListener("mouseout", function resetHighlight() {
                gridCells.forEach((cell) => {
                    cell.style.backgroundColor = ""; // Resetting to default color
                });
            });

            cell.addEventListener("click", function placeCurrentShip() {
                const x = parseInt(cell.getAttribute("data-x"));
                const y = parseInt(cell.getAttribute("data-y"));

                if (
                    game.player.gameBoard.placeShip(
                        Ship(possibleShipLengths[currentShipIndex]),
                        x,
                        y,
                        orientation,
                    )
                ) {
                    // Display the ship visually (you can adjust this based on your needs)
                    functions.displayShips(game.player, "#player-grid");
                    currentShipIndex++;
                    if (currentShipIndex === possibleShipLengths.length) {
                        // Stop the placement logic if all ships are placed
                        setTimeout(() => {
                            const newPlayerGrid = playerGrid.cloneNode(true);
                            playerGrid.parentNode.replaceChild(newPlayerGrid, playerGrid);
                        }, 500);
                        changeOrientation.classList.add("hidden");
                        document.querySelector("#start-game").classList.remove("inactive");
                    }
                }
            });
        });
    }

    function updateInfos() {
        const playerInfoShips = document.querySelector("#player-info-ships");
        const opponentInfoShips = document.querySelector("#opponent-info-ships");

        playerInfoShips.textContent = `Ship squares remaining: ${
            17 - game.player.gameBoard.successfulAttacks.length
        }`;
        opponentInfoShips.textContent = `Ship squares remaining: ${
            17 - game.computer.gameBoard.successfulAttacks.length
        }`;
        console.log(game.computer.gameBoard.successfulAttacks);
    }

    function computerReset() {
        game.player.attacksMade.length = 0;
        game.computer.attacksMade.length = 0;
        game.player.gameBoard.successfulAttacks.length = 0;
        game.player.gameBoard.missedAttacks.length = 0;
        game.computer.gameBoard.coordsShips.length = 0;
        game.computer.gameBoard.ships.length = 0;
        game.computer.gameBoard.successfulAttacks.length = 0;
        game.computer.gameBoard.missedAttacks.length = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                game.computer.gameBoard.grid[i][j] = null;
            }
        }
    }
    function reset() {
        const avert = document.querySelector("#avert");
        avert.textContent = "";
        computerReset();
        game.player.gameBoard.coordsShips.length = 0;
        game.player.gameBoard.ships.length = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                game.player.gameBoard.grid[i][j] = null;
            }
        }
        game.playerTurn = true;
        document.querySelectorAll(".grid-cell").forEach((cell) => {
            cell.classList.remove("hit");
            cell.classList.remove("miss");
            cell.classList.remove("ship");
        });
        document.querySelector("#change-orientation").classList.add("hidden");
        document.querySelector("#buttons").classList.remove("hidden");
        document.querySelector("#start-game").classList.add("inactive");
    }

    return {
        displayShips,
        displayHits,
        placeShipsManually,
        reset,
        updateInfos,
        computerReset,
    };
})();

export default functions;
