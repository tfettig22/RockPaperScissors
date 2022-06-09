// *** QuerySelectors *** //
// Buttons
var changeGameButton = document.querySelector(".change-game-button");
var classicButton = document.querySelector(".classic-button");
var twistButton = document.querySelector(".twist-button");
var humanToken = document.querySelector(".human-token-selector");
// Sections
var humanSection = document.querySelector(".human-section");
var buttonOptionSection = document.querySelector(".button-option-section");
var classicGameSection = document.querySelector(".classic-game-section");
var twistGameSection = document.querySelector(".twist-game-section");
// Misc
var gameTypePrompt = document.querySelector(".game-type-prompt");
var humanToken = document.querySelector(".human-token-selector");
var computerToken = document.querySelector(".computer-token-selector");
var humanCounter = document.querySelector(".human-counter");
var computerCounter = document.querySelector(".computer-counter");
var humanChoiceIcon = document.querySelector(".human-choice-icon");
var computerChoiceIcon = document.querySelector(".computer-choice-icon");
// *** Event Listeners *** //
changeGameButton.addEventListener("click", changeGameType);
classicButton.addEventListener("click", playClassicGame);
twistButton.addEventListener("click", playTwistGame);
classicGameSection.addEventListener("click", makeClassicSelection);
twistGameSection.addEventListener("click", makeTwistSelection);
// *** Global Variables *** //
var human;
var computer;
var game;
// *** Functions *** //
function changeDisplay() {
  changeGameButton.classList.remove("hidden");
  buttonOptionSection.classList.add("hidden");
  humanToken.setAttribute("disabled", "");
  computerToken.setAttribute("disabled", "");
}

function changeGameType() {
  changeGameButton.classList.add("hidden");
  buttonOptionSection.classList.remove("hidden");
  classicGameSection.classList.add("hidden");
  twistGameSection.classList.add("hidden");
  gameTypePrompt.innerText = "Choose your game type:";
  humanToken.removeAttribute("disabled", "");
  computerToken.removeAttribute("disabled", "");
  resetScoreBoard()
};

function playClassicGame() {
  changeDisplay();
  displayClassic();
  classicGameSection.classList.remove("hidden");
  gameTypePrompt.innerText = "Classic: Rock, Paper, Scissors";
  human = new Player("Tom", humanToken.value);
  computer = new Player("Opponent", computerToken.value);
  game = new Game("classic");
};

function playTwistGame() {
  changeDisplay();
  displayTwist();
  twistGameSection.classList.remove("hidden");
  gameTypePrompt.innerText = "Rock Paper Scissors with a twist: Lizards and Aliens!";
  human = new Player("Tom", humanToken.value);
  computer = new Player("Opponent", computerToken.value);
  game = new Game("twist");
};

function displayClassic() {
  classicGameSection.innerHTML = "";
  classicGameSection.innerHTML +=
  `<button class="option" id="Rock">Rock</button>
  <button class="option"id="Paper">Paper</button>
  <button class="option"id="Scissors">Scissors</button>`;
}

function displayTwist() {
  twistGameSection.innerHTML = "";
  twistGameSection.innerHTML +=
  `<button class="option"id="Rock">Rock</button>
  <button class="option"id="Paper">Paper</button>
  <button class="option"id="Scissors">Scissors</button>
  <button class="option"id="Lizard">Lizard</button>
  <button class="option"id="Alien">Alien</button>`;
}

function makeClassicSelection() {
  if (event.target.classList.value === "option") {
    human.choice = event.target.id;
    computer.takeTurn();
    compareResults();
    updateScoreBoard();
    updateHumanChoiceIcons();
    updateComputerChoiceIcons();
    console.log(human.choice)
    console.log(computer.choice)
  }
}

function makeTwistSelection() {
  if (event.target.classList.value === "option") {
    human.choice = event.target.id;
    computer.takeTwistTurn();
    compareResults();
    updateScoreBoard();
    updateHumanChoiceIcons();
    updateComputerChoiceIcons();
    console.log(human.choice)
    console.log(computer.choice)
  }
}

function compareResults() {
    if (human.choice === computer.choice) {
      gameTypePrompt.innerText = "Draw!";
  } else if ((human.choice === "Rock" && computer.choice === "Scissors") ||
            (human.choice === "Rock" && computer.choice === "Lizard") ||
            (human.choice === "Paper" && computer.choice === "Rock") ||
            (human.choice === "Paper" && computer.choice === "Alien") ||
            (human.choice === "Scissors" && computer.choice === "Paper") ||
            (human.choice === "Scissors" && computer.choice === "Lizard") ||
            (human.choice === "Lizard" && computer.choice === "Paper") ||
            (human.choice === "Lizard" && computer.choice === "Alien") ||
            (human.choice === "Alien" && computer.choice === "Scissors") ||
            (human.choice === "Alien" && computer.choice === "Rock")) {
      gameTypePrompt.innerText = `${human.choice} beats ${computer.choice}, You win!`;
      human.wins++;
  } else if ((human.choice === "Rock" && computer.choice === "Paper") ||
            (human.choice === "Rock" && computer.choice === "Alien") ||
            (human.choice === "Paper" && computer.choice === "Scissors") ||
            (human.choice === "Paper" && computer.choice === "Lizard") ||
            (human.choice === "Scissors" && computer.choice === "Rock") ||
            (human.choice === "Scissors" && computer.choice === "Alien") ||
            (human.choice === "Lizard" && computer.choice === "Rock") ||
            (human.choice === "Lizard" && computer.choice === "Scissors") ||
            (human.choice === "Alien" && computer.choice === "Paper") ||
            (human.choice === "Alien" && computer.choice === "Lizard")) {
      gameTypePrompt.innerText = `${computer.choice} beats ${human.choice}, You lose...`;
      computer.wins++;
  }
}

function updateScoreBoard() {
  humanCounter.innerText = `Wins: ${human.wins}`;
  computerCounter.innerText = `Wins: ${computer.wins}`;
}

function resetScoreBoard() {
  humanCounter.innerText = "Wins: 0";
  computerCounter.innerText = "Wins: 0";
}

function updateHumanChoiceIcons() {
    if (human.choice === "Rock") {
      humanChoiceIcon.innerText = "🗿"
  } else if (human.choice === "Paper") {
      humanChoiceIcon.innerText = "📜"
  } else if (human.choice === "Scissors") {
      humanChoiceIcon.innerText = "✂️"
  } else if (human.choice === "Lizard") {
      humanChoiceIcon.innerText = "🦎"
  } else if (human.choice === "Alien") {
      humanChoiceIcon.innerText = "👽"
  }
}

function updateComputerChoiceIcons() {
    if (computer.choice === "Rock") {
      computerChoiceIcon.innerText = "🗿"
  } else if (computer.choice === "Paper") {
      computerChoiceIcon.innerText = "📜"
  } else if (computer.choice === "Scissors") {
      computerChoiceIcon.innerText = "✂️"
  } else if (computer.choice === "Lizard") {
      computerChoiceIcon.innerText = "🦎"
  } else if (computer.choice === "Alien") {
      computerChoiceIcon.innerText = "👽"
  }
}
