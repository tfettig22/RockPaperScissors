class Game {
  constructor(gameType) {
    this.type = gameType;
    this.roundsPlayed = 0;
    this.drawCount = 0;
    this.draw = null;
    this.humanWin = null;
    this.computerWin = null;
  }

  playARound() {
    this.roundsPlayed++;
  }

  compareResults() {
      if (human.choice === computer.choice) {
        this.drawCount++;
        this.draw = true;
        this.humanWin = false;
        this.computerWin = false;
    } else if ((human.choice === "Rhino" && computer.choice === "Crocodile") ||
              (human.choice === "Rhino" && computer.choice === "Gorilla") ||
              (human.choice === "Tiger" && computer.choice === "Rhino") ||
              (human.choice === "Tiger" && computer.choice === "Elephant") ||
              (human.choice === "Crocodile" && computer.choice === "Tiger") ||
              (human.choice === "Crocodile" && computer.choice === "Gorilla") ||
              (human.choice === "Gorilla" && computer.choice === "Tiger") ||
              (human.choice === "Gorilla" && computer.choice === "Elephant") ||
              (human.choice === "Elephant" && computer.choice === "Crocodile") ||
              (human.choice === "Elephant" && computer.choice === "Rhino")) {
        human.wins++;
        this.humanWin = true;
        this.computerWin = false;
        this.draw = false;
    } else {
        computer.wins++;
        this.computerWin = true;
        this.humanWin = false;
        this.draw = false;
    }
  }




}
