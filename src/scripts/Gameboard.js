function Gameboard() {
    const grid = new Array(10).fill(null).map(() => new Array(10).fill(null));
    const ships = [];
    const missedAttacks = [];
    const successfulAttacks = [];
    this.isAllSunk = false;

    function placeShip(ship, x, y, direction) {
        switch (direction) {
            case 'left':
                for (let i = 0; i < ship.length; i++) {
                    grid[x - i][y] = ship;
                }
                break;
            case 'right':
                for (let i = 0; i < ship.length; i++) {
                    grid[x + i][y] = ship;
                }
                break;
            case 'up':
                for (let i = 0; i < ship.length; i++) {
                    grid[x][y - i] = ship;
                }
                break;
            case 'down':
                for (let i = 0; i < ship.length; i++) {
                    grid[x][y + i] = ship;
                }
                break;
        }
        ships.push(ship);
    }
    function receiveAttack(x, y) {
        if (grid[x][y] === null) {
            missedAttacks.push([x, y]);
        } else {
            grid[x][y].hit();
            successfulAttacks.push([x, y]);
        }
    }

    function isAllSunk() {
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                return false;
            }
        }
        return true;
    }

    return { grid, ships, missedAttacks, successfulAttacks, isAllSunk, placeShip, receiveAttack };
}

module.exports = Gameboard;