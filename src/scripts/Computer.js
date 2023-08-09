const Player = require("./Player");

function Computer() {
    // Create a base computer object using Player
    const computer = Player("Computer");

    // Save the original attack function
    const originalAttack = computer.attack;

    // Override the attack function
    computer.attack = function (opponent) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        // Check if the attack coordinates have been used before
        while (
            computer.attacksMade.some((coords) => coords[0] === x && coords[1] === y)
            ) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        }

        // Call the original attack function
        originalAttack(opponent, x, y);
    };

    return computer; // Return the modified computer object
}

module.exports = Computer;
