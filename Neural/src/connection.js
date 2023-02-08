class Connection {
  constructor(from, to) {
    this.from = from;
    this.to = to;
    this.weight = Math.random();
    this.change = 0;
  }

  setWeight(x) {
    this.weight = x;
  }

  setChange(x) {
    this.change = x;
  }

  toJSON() {
    return {
      from: this.from,
      to: this.to,
      weight: this.weight,
      change: this.change,
    };
  }
}

module.exports = { Connection };
