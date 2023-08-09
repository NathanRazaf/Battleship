const Gameboard = require("./Gameboard");
const Ship = require("./Ship");
function Player(name) {
    this.name = name;
    const gameBoard = Gameboard();
    const attacksMade = [];

    function attack(opponent, x, y) {
        opponent.gameBoard.receiveAttack(x, y);
        attacksMade.push([x, y]);
    }

    function placeShipsAtRandom() {
        gameBoard.coordsShips.length = 0;
        gameBoard.ships.length = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                gameBoard.grid[i][j] = null;
            }
        }
        const possibleShipLengths = [5, 4, 3, 3, 2];

        possibleShipLengths.forEach((shipLength) => {
            const ship = Ship(shipLength);
            let x, y, direction;

            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                direction = Math.floor(Math.random() * 2) === 0 ? "h" : "v";
            } while (!gameBoard.placeShip(ship, x, y, direction));
        });
    }

    return { name, attack, attacksMade, gameBoard, placeShipsAtRandom };
}

module.exports = Player;
