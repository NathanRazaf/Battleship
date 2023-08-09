function Ship(length) {
  this.length = length;
  function hit() {
    this.length--;
  }
  function isSunk() {
    return this.length === 0;
  }
  return { length, hit, isSunk };
}

module.exports = Ship;
