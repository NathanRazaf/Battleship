const ShipTest = require('./Ship.js');

test('Ship has a length', () => {
    const ship = ShipTest(4);
    expect(ship.length).toBe(4);
});

test('Ship can be hit', () => {
    const ship = ShipTest(4);
    ship.hit();
    expect(ship.length).toBe(3);
});

test('Ship can be sunk', () => {
    const ship = ShipTest(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test('Ship can be hit multiple times', () => {
    const ship = ShipTest(4);
    ship.hit();
    ship.hit();
    expect(ship.length).toBe(2);
    expect(ship.isSunk()).toBe(false);
});