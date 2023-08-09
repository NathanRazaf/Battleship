const GameboardTest = require('./Gameboard');
const ShipTest = require('./Ship');

test('Gameboard receives ships', () => {
    const gameboard = GameboardTest();
    gameboard.placeShip(ShipTest(4), 0, 0, 'h');
    expect(gameboard.ships.length).toBe(1);
    expect(gameboard.grid[0][0]).toBe(gameboard.ships[0]);
    expect(gameboard.grid[1][0]).toBe(gameboard.ships[0]);
    expect(gameboard.grid[2][0]).toBe(gameboard.ships[0]);
    expect(gameboard.grid[3][0]).toBe(gameboard.ships[0]);
    expect(gameboard.grid[4][0]).toBe(null);
});

test('Gameboard receives attacks', () => {
    const gameboard = GameboardTest();
    gameboard.placeShip(ShipTest(4), 3, 4, 'h');
    expect(gameboard.grid[3][4].length).toBe(4);
    gameboard.receiveAttack(3, 5);
    expect(gameboard.grid[3][4].length).toBe(4);
    expect(gameboard.successfulAttacks.length).toBe(0);
    gameboard.receiveAttack(3, 4);
    expect(gameboard.grid[3][4].length).toBe(3);
    expect(gameboard.grid[4][4].length).toBe(3);
    expect(gameboard.grid[5][4].length).toBe(3);
    expect(gameboard.successfulAttacks.length).toBe(1);
    expect(gameboard.successfulAttacks[0]).toEqual([3, 4]);
});

test('Gameboard keeps track of missed attacks', () => {
    const gameboard = GameboardTest();
    gameboard.placeShip(ShipTest(4), 3, 4, 'h');
    gameboard.receiveAttack(3, 5);
    gameboard.receiveAttack(3, 6);
    expect(gameboard.missedAttacks.length).toBe(2);
    expect(gameboard.missedAttacks[0][0]).toBe(3);
    expect(gameboard.missedAttacks[0][1]).toBe(5);
    expect(gameboard.missedAttacks[1][0]).toBe(3);
    expect(gameboard.missedAttacks[1][1]).toBe(6);
});

test('Gameboard keeps track of sunk ships', () => {
    const gameboard = GameboardTest();
    gameboard.placeShip(ShipTest(2), 3, 4, 'h');
    expect(gameboard.ships.length).toBe(1);
    gameboard.receiveAttack(3, 4);
    expect(gameboard.ships[0].isSunk()).toBe(false);
    gameboard.receiveAttack(4, 4);
    expect(gameboard.ships[0].isSunk()).toBe(true);
    expect(gameboard.isAllSunk()).toBe(true);
});