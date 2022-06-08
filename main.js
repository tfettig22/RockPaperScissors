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

// *** Event Listeners *** //

changeGameButton.addEventListener("click", changeGameType);
classicButton.addEventListener("click", playClassicGame);
twistButton.addEventListener("click", playTwistGame);

// *** Functions *** //

function changeGameType() {
  changeGameButton.classList.add("hidden");
  buttonOptionSection.classList.remove("hidden");
  classicGameSection.classList.add("hidden");
  twistGameSection.classList.add("hidden");
  gameTypePrompt.innerText = "Choose your game type:"
};

function playClassicGame() {
  changeGameButton.classList.remove("hidden");
  buttonOptionSection.classList.add("hidden");
  classicGameSection.classList.remove("hidden");
  gameTypePrompt.innerText = "Classic: Rock, Paper, Scissors"

}

function playTwistGame() {
  changeGameButton.classList.remove("hidden");
  buttonOptionSection.classList.add("hidden");
  twistGameSection.classList.remove("hidden");
  gameTypePrompt.innerText = "Rock Paper Scissors with a twist: Lizards and Aliens!"
}

// playTwistGame() {
//
// };
