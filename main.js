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
  gameTypePrompt.innerText = "Classic: Rhino, Tiger, Crocodile";
  human = new Player("Tom", humanToken.value);
  computer = new Player("Opponent", computerToken.value);
  game = new Game("classic");
};

function playTwistGame() {
  changeDisplay();
  displayTwist();
  twistGameSection.classList.remove("hidden");
  gameTypePrompt.innerText = "Rhino Tiger Crocodile with a twist: Gorillas and Elephants!";
  human = new Player("Tom", humanToken.value);
  computer = new Player("Opponent", computerToken.value);
  game = new Game("twist");
};

function displayClassic() {
  classicGameSection.innerHTML = "";
  classicGameSection.innerHTML +=
  `<button class="option" id="Rhino">Rhino</button>
  <button class="option"id="Tiger">Tiger</button>
  <button class="option"id="Crocodile">Crocodile</button>`;
}

function displayTwist() {
  twistGameSection.innerHTML = "";
  twistGameSection.innerHTML +=
  `<button class="option"id="Rhino">Rhino</button>
  <button class="option"id="Tiger">Tiger</button>
  <button class="option"id="Crocodile">Crocodile</button>
  <button class="option"id="Gorilla">Gorilla</button>
  <button class="option"id="Elephant">Elephant</button>`;
}

function makeClassicSelection() {
  if (event.target.classList.value === "option") {
    human.choice = event.target.id;
    computer.takeTurn();
    compareResults();
    updateScoreBoard();
    updateHumanChoiceIcons();
    updateComputerChoiceIcons();
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
  }
}

function compareResults() {
    if (human.choice === computer.choice) {
      gameTypePrompt.innerText = "Draw!";
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
      gameTypePrompt.innerText = `${human.choice} beats ${computer.choice}, You win!`;
      human.wins++;
  } else if ((human.choice === "Rhino" && computer.choice === "Tiger") ||
            (human.choice === "Rhino" && computer.choice === "Elephant") ||
            (human.choice === "Tiger" && computer.choice === "Crocodile") ||
            (human.choice === "Tiger" && computer.choice === "Gorilla") ||
            (human.choice === "Crocodile" && computer.choice === "Rhino") ||
            (human.choice === "Crocodile" && computer.choice === "Elephant") ||
            (human.choice === "Gorilla" && computer.choice === "Rhino") ||
            (human.choice === "Gorilla" && computer.choice === "Crocodile") ||
            (human.choice === "Elephant" && computer.choice === "Tiger") ||
            (human.choice === "Elephant" && computer.choice === "Gorilla")) {
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
    if (human.choice === "Rhino") {
      humanChoiceIcon.innerText = "🦏"
  } else if (human.choice === "Tiger") {
      humanChoiceIcon.innerText = "🐅"
  } else if (human.choice === "Crocodile") {
      humanChoiceIcon.innerText = "🐊"
  } else if (human.choice === "Gorilla") {
      humanChoiceIcon.innerText = "🦍"
  } else if (human.choice === "Elephant") {
      humanChoiceIcon.innerText = "🐘"
  }
}

function updateComputerChoiceIcons() {
    if (computer.choice === "Rhino") {
      computerChoiceIcon.innerText = "🦏"
  } else if (computer.choice === "Tiger") {
      computerChoiceIcon.innerText = "🐅"
  } else if (computer.choice === "Crocodile") {
      computerChoiceIcon.innerText = "🐊"
  } else if (computer.choice === "Gorilla") {
      computerChoiceIcon.innerText = "🦍"
  } else if (computer.choice === "Elephant") {
      computerChoiceIcon.innerText = "🐘"
  }
}
