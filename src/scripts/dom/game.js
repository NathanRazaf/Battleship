import Computer from "../Computer";
import Player from "../Player";
import functions from "./functions";

const game = (() => {
    let player = Player("Player");
    let computer = Computer();
    let playerTurn = true;
    function launch() {
        functions.computerReset();
        computer.placeShipsAtRandom();
        const opponentGrid = document.querySelector("#opponent-grid");
        const gridCells = opponentGrid.querySelectorAll(".grid-cell");
        gridCells.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                attackByPlayer(e);
            });
        });
    }

    function attackByPlayer(e) {
        if (playerTurn) {
            const x = parseInt(e.target.getAttribute("data-x"), 10);
            const y = parseInt(e.target.getAttribute("data-y"), 10);
            if (
                player.attacksMade.some((attack) => attack[0] === x && attack[1] === y)
            ) {
                return;
            }
            player.attack(computer, x, y);
            functions.updateInfos();
            functions.displayHits(computer, "#opponent-grid");
            if (computer.gameBoard.isAllSunk()) {
                const avert = document.querySelector("#avert");
                avert.textContent = "You won!";
                avert.style.color = "green";
                document.querySelector("#change-orientation").classList.add("hidden");
                document.querySelector("#buttons").classList.remove("hidden");
                document.querySelector("#start-game").classList.add("inactive");
                return;
            }
            playerTurn = false;
            setTimeout(attackByComputer, 1000);
            setTimeout(() => {
                playerTurn = true;
            }, 1000);
        }
    }

    function attackByComputer() {
        computer.attack(player);
        functions.updateInfos();
        functions.displayHits(player, "#player-grid");
        if (player.gameBoard.isAllSunk()) {
            const avert = document.querySelector("#avert");
            avert.textContent = "You lost!";
            avert.style.color = "red";
            document.querySelector("#change-orientation").classList.add("hidden");
            document.querySelector("#buttons").classList.remove("hidden");
            document.querySelector("#start-game").classList.add("inactive");
        }
    }

    return {
        launch,
        player,
        computer,
        playerTurn,
    };
})();

export default game;
