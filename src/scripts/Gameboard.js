function Gameboard() {
    const grid = new Array(10).fill(null).map(() => new Array(10).fill(null));
    const coordsShips = [];
    const ships = [];
    const missedAttacks = [];
    const successfulAttacks = [];

    function placeShip(ship, x, y, direction) {
        let isValidPlacement = true;

        switch (direction) {
            case "h":
                if (y + ship.length - 1 > 9) return false; // Check bounds before starting loop
                for (let i = 0; i < ship.length; i++) {
                    if (grid[x][y + i] !== null) {
                        isValidPlacement = false;
                        break;
                    }
                }
                if (isValidPlacement) {
                    for (let i = 0; i < ship.length; i++) {
                        grid[x][y + i] = ship;
                        coordsShips.push([x, y + i]);
                        ships.push(ship);
                    }
                }
                break;

            case "v":
                if (x + ship.length - 1 > 9) return false; // Check bounds before starting loop
                for (let i = 0; i < ship.length; i++) {
                    if (grid[x + i][y] !== null) {
                        isValidPlacement = false;
                        break;
                    }
                }
                if (isValidPlacement) {
                    for (let i = 0; i < ship.length; i++) {
                        grid[x + i][y] = ship;
                        coordsShips.push([x + i, y]);
                        ships.push(ship);
                    }
                }
                break;
        }

        return isValidPlacement;
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

    return {
        grid,
        coordsShips,
        ships,
        missedAttacks,
        successfulAttacks,
        isAllSunk,
        placeShip,
        receiveAttack,
    };
}

module.exports = Gameboard;
