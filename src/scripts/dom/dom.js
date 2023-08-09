import functions from "./functions";
import game from "./game";

const dom = (() => {
    function eventListeners() {
        const startGame = document.querySelector("#start-game");
        startGame.addEventListener("click", () => {
            document.querySelector("#buttons").classList.add("hidden");
            game.launch();
        });

        const randomizeShips = document.querySelector("#randomize-ships");
        randomizeShips.addEventListener("click", (e) => {
            functions.reset();
            game.player.placeShipsAtRandom();
            functions.displayShips(game.player, "#player-grid");
            document.querySelector("#start-game").classList.remove("inactive");
        });

        const manualPlacement = document.querySelector("#manual-placement");
        manualPlacement.addEventListener("click", (e) => {
            functions.reset();
            functions.placeShipsManually();
        });
    }
    function fillGrids() {
        const playerGrid = document.querySelector("#player-grid");
        const opponentGrid = document.querySelector("#opponent-grid");

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const playerGridCell = document.createElement("div");
                playerGridCell.classList.add("grid-cell");
                playerGridCell.setAttribute("data-x", i);
                playerGridCell.setAttribute("data-y", j);
                playerGrid.appendChild(playerGridCell);
                const opponentGridCell = document.createElement("div");
                opponentGridCell.classList.add("grid-cell");
                opponentGridCell.setAttribute("data-x", i);
                opponentGridCell.setAttribute("data-y", j);
                opponentGrid.appendChild(opponentGridCell);
            }
        }
    }

    function initialize() {
        fillGrids();
        eventListeners();
    }

    return { initialize };
})();

export default dom;
