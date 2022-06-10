class Player {
  constructor(name, token) {
    this.name = name;
    this.token = token;
    this.choice = null;
    this.wins = 0;
  };

  takeTurn() {
    var validChoices = ["Rhino", "Tiger", "Crocodile"]
    var randomChoice = Math.floor(Math.random() * validChoices.length)
    this.choice = (validChoices[randomChoice])
  };

  takeTwistTurn() {
    var validChoices = ["Rhino", "Tiger", "Crocodile", "Gorilla", "Elephant"]
    var randomChoice = Math.floor(Math.random() * validChoices.length)
    this.choice = (validChoices[randomChoice])
  }

};
