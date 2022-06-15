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
var animationTimeout;
// *** Functions *** //
function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function addEffect(element, effect) {
  element.classList.add(effect);
}

function removeEffect(element, effect) {
  element.classList.remove(effect);
}

function disable(element) {
  element.setAttribute("disabled", "");
}

function enable(element) {
  element.removeAttribute("disabled", "");
}

function changeDisplay() {
  hide(buttonOptionSection);
  show(changeGameButton);
  disable(humanToken);
  disable(computerToken);
  disable(humanNameInput);
  disable(computerNameInput);
}

function changeGameType() {
  hide(changeGameButton);
  hide(classicGameSection);
  hide(twistGameSection);
  show(buttonOptionSection);
  enable(humanToken);
  enable(computerToken);
  enable(humanNameInput);
  enable(computerNameInput);
  resetScoreBoard();
  resetIcons();
  resetGamePrompt();
}

function playClassicGame() {
  human = new Player(humanNameInput.value, humanToken.value);
  computer = new Player(computerNameInput.value, computerToken.value);
  game = new Game("Classic");
  show(classicGameSection);
  resetGamePrompt();
  changeDisplay();
  displayGame();
}

function playTwistGame() {
  human = new Player(humanNameInput.value, humanToken.value);
  computer = new Player(computerNameInput.value, computerToken.value);
  game = new Game("Twist");
  show(twistGameSection);
  resetGamePrompt();
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
  addAnimation();
  var scoreTimeout = setTimeout(updateScoreBoard, 1850);
}

function makeSelection() {
  if (event.target.classList.value === "option" && game.type === "Classic") {
      updateGameData();
      animationTimeout = setTimeout(removeAnimation, 4000);
  } else if (event.target.classList.value === "option" && game.type === "Twist") {
      updateGameData();
      animationTimeout = setTimeout(removeAnimation, 4000);
  }
}

function updateGamePrompt() {
  if (game.draw === true) {
    gameTypePrompt.innerText = "Draw!";
  } else if (game.humanWin === true) {
    gameTypePrompt.innerText = `${human.choice} beats ${computer.choice}, ${human.name} has defeated ${computer.name}!`;
  } else {
    gameTypePrompt.innerText = `${computer.choice} beats ${human.choice}, ${human.name} has lost to ${computer.name}...`;
  }
}

function resetGamePrompt() {
  gameTypePrompt.innerText = "Choose your fighter!";
}

function addAnimation() {
  hide(changeGameButton);
  addEffect(gameTypePrompt, "fade-in");
  addEffect(humanChoiceIcon, "human-move-to-middle");
  addEffect(computerChoiceIcon, "comp-move-to-middle");
  if (game.type === "Classic") {
    hide(classicGameSection);
  } else if (game.type === "Twist") {
    hide(twistGameSection);
  }
}

function removeAnimation() {
  resetGamePrompt();
  show(changeGameButton);
  removeEffect(gameTypePrompt, "fade-in")
  removeEffect(humanChoiceIcon, "human-move-to-middle");
  removeEffect(computerChoiceIcon, "comp-move-to-middle");
  removeEffect(humanChoiceIcon, "defeat")
  removeEffect(computerChoiceIcon, "defeat")
  if (game.type === "Classic") {
    show(classicGameSection);
  } else if (game.type === "Twist") {
    show(twistGameSection);
  }
}

function updateScoreBoard() {
  humanCounter.innerText = `Wins: ${human.wins}`;
  computerCounter.innerText = `Wins: ${computer.wins}`;
  if (game.humanWin === true) {
    addEffect(computerChoiceIcon, "defeat");
  } else if (game.computerWin === true) {
    addEffect(humanChoiceIcon, "defeat");
  }
}

function resetScoreBoard() {
  humanCounter.innerText = "Wins: 0";
  computerCounter.innerText = "Wins: 0";
}

function resetIcons() {
  humanChoiceIcon.innerText = "";
  computerChoiceIcon.innerText = "";
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
