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
var humanNameInput = document.querySelector(".name-input");
var computerNameInput = document.querySelector(".computer-name-input");
// *** Event Listeners *** //
changeGameButton.addEventListener("click", changeGameType);
classicButton.addEventListener("click", playClassicGame);
twistButton.addEventListener("click", playTwistGame);
classicGameSection.addEventListener("click", makeSelection);
twistGameSection.addEventListener("click", makeSelection);
// *** Global Variables *** //
var human;
var computer;
var game;
var effectsTimeout;
var scoreTimeout;
// *** Functions *** //
function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function changeDisplay() {
  show(changeGameButton);
  hide(buttonOptionSection);
  humanToken.setAttribute("disabled", "");
  computerToken.setAttribute("disabled", "");
  humanNameInput.setAttribute("disabled", "");
  computerNameInput.setAttribute("disabled", "");
}

function changeGameType() {
  hide(changeGameButton);
  hide(classicGameSection);
  hide(twistGameSection);
  show(buttonOptionSection);
  resetScoreBoard();
  resetIcons();
  humanToken.removeAttribute("disabled", "");
  computerToken.removeAttribute("disabled", "");
  humanNameInput.removeAttribute("disabled", "");
  computerNameInput.removeAttribute("disabled", "");
  gameTypePrompt.innerText = "Choose your game type:";
}

function playClassicGame() {
  show(classicGameSection);
  gameTypePrompt.innerText = "Choose your fighter!";
  human = new Player(humanNameInput.value, humanToken.value);
  computer = new Player(computerNameInput.value, computerToken.value);
  game = new Game("Classic");
  changeDisplay();
  displayGame();
}

function playTwistGame() {
  show(twistGameSection);
  gameTypePrompt.innerText = "Choose your fighter!";
  human = new Player(humanNameInput.value, humanToken.value);
  computer = new Player(computerNameInput.value, computerToken.value);
  game = new Game("Twist");
  changeDisplay();
  displayGame();
};

function displayGame() {
  classicGameSection.innerHTML = "";
  twistGameSection.innerHTML = "";
  if (game.type === "Classic") {
    classicGameSection.innerHTML +=
    `<div class="animal-options">
      <button class="option"id="Rhino">🦏</button>
      <button class="option"id="Tiger">🐅</button>
      <button class="option"id="Crocodile">🐊</button>
    </div>
    <div>
      <p class="game-counter">
      Rounds Played: ${game.roundsPlayed} --- Draws: ${game.drawCount}
      </p>
    <div>`;
  } else if (game.type === "Twist") {
    twistGameSection.innerHTML +=
    `<div class="animal-options">
      <button class="option"id="Rhino">🦏</button>
      <button class="option"id="Tiger">🐅</button>
      <button class="option"id="Crocodile">🐊</button>
      <button class="option"id="Gorilla">🦍</button>
      <button class="option"id="Elephant">🐘</button>
    </div>
    <div>
      <p class="game-counter">
      Rounds Played: ${game.roundsPlayed} --- Draws: ${game.drawCount}
      </p>
    </div>`;
  }
}

function updateGameData() {
  human.choice = event.target.id;
  computer.takeTurn();
  game.compareResults();
  game.playARound();
  displayGame();
  updateGamePrompt();
  updateHumanChoiceIcons();
  updateComputerChoiceIcons();
  fadeWinPrompt();
  scoreTimeout = setTimeout(updateScoreBoard, 2250);
}

function makeSelection() {
  if (event.target.classList.value === "option" && game.type === "Classic") {
      updateGameData();
      classicAddEffects();
      effectsTimeout = setTimeout(classicRemoveEffects, 4000);
  } else if (event.target.classList.value === "option" && game.type === "Twist") {
      updateGameData();
      twistAddEffects();
      effectsTimeout = setTimeout(twistRemoveEffects, 4000);
  }
}

function updateGamePrompt() {
  if (game.draw === true) {
    gameTypePrompt.innerText = "Draw!";
  } else if (game.humanWin === true) {
    gameTypePrompt.innerText = `${human.choice} beats ${computer.choice}, ${human.name} wins!`;
  } else {
    gameTypePrompt.innerText = `${computer.choice} beats ${human.choice}, ${human.name} loses...`;
  }
}

function classicAddEffects() {
  hide(classicGameSection);
  addAnimation();
}

function classicRemoveEffects() {
  show(classicGameSection);
  removeAnimation();
  gameTypePrompt.innerText = "Choose your fighter!";
  gameTypePrompt.classList.remove("fade-in");
}

function twistAddEffects() {
  hide(twistGameSection);
  addAnimation();
}

function twistRemoveEffects() {
  show(twistGameSection);
  removeAnimation();
  gameTypePrompt.innerText = "Choose your fighter!";
  gameTypePrompt.classList.remove("fade-in");
}

function addAnimation() {
  hide(changeGameButton);
  humanChoiceIcon.classList.add("human-move-to-middle");
  computerChoiceIcon.classList.add("comp-move-to-middle");
}

function removeAnimation() {
  show(changeGameButton);
  humanChoiceIcon.classList.remove("human-move-to-middle");
  computerChoiceIcon.classList.remove("comp-move-to-middle");
}

function updateScoreBoard() {
  humanCounter.innerText = `Wins: ${human.wins}`;
  computerCounter.innerText = `Wins: ${computer.wins}`;
}

function resetScoreBoard() {
  humanCounter.innerText = "Wins: 0";
  computerCounter.innerText = "Wins: 0";
}

function resetIcons() {
  humanChoiceIcon.innerText = "";
  computerChoiceIcon.innerText = "";
}

function fadeWinPrompt() {
  gameTypePrompt.classList.add("fade-in");
}

function updateHumanChoiceIcons() {
    if (human.choice === "Rhino") {
      humanChoiceIcon.innerText = "🦏";
  } else if (human.choice === "Tiger") {
      humanChoiceIcon.innerText = "🐅";
  } else if (human.choice === "Crocodile") {
      humanChoiceIcon.innerText = "🐊";
  } else if (human.choice === "Gorilla") {
      humanChoiceIcon.innerText = "🦍";
  } else if (human.choice === "Elephant") {
      humanChoiceIcon.innerText = "🐘";
  }
}

function updateComputerChoiceIcons() {
    if (computer.choice === "Rhino") {
      computerChoiceIcon.innerText = "🦏";
  } else if (computer.choice === "Tiger") {
      computerChoiceIcon.innerText = "🐅";
  } else if (computer.choice === "Crocodile") {
      computerChoiceIcon.innerText = "🐊";
  } else if (computer.choice === "Gorilla") {
      computerChoiceIcon.innerText = "🦍";
  } else if (computer.choice === "Elephant") {
      computerChoiceIcon.innerText = "🐘";
  }
}
