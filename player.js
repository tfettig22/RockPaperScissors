class Player {
  constructor(name, token) {
    this.name = name;
    this.token = token;
    this.choice = null;
    this.wins = 0;
  };

  takeTurn() {
    var validChoices = ["Rock", "Paper", "Scissors"]
    var randomChoice = Math.floor(Math.random() * validChoices.length)
    this.choice = (validChoices[randomChoice])
  };

};
