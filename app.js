let computerDeck = document.querySelector("#comp-deck");
let compCardSlot = document.querySelector("#comp-card");
let playerCardSlot = document.querySelector("#player-card");
let player1Deck = document.querySelector("#player-deck");
let cardValue = document.querySelectorAll(".card-value");
let cardSuit = document.querySelectorAll(".card-suit");
const startGameBtn = document.getElementById("start-game");
const restartBtn = document.getElementById("restart");
const checkWinnerBtn = document.getElementById("check-winner");
document.getElementById("comp-card").style.visibility = "hidden";
document.getElementById("player-card").style.visibility = "hidden";
document.getElementById("status-text").style.visibility = "hidden";

const suits = ["S", "C", "H", "D"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

let deck = [];
let playerCard = [];
let computerCard = [];
let rounds = 0;

function createDeck() {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + suits[i]);
    }
  }

  console.log(deck);
}

function getValue(card) {
  let data = card.split("-");
  let value = data[0];
  if (isNaN(value)) {
    if (value === "A") {
      return 14;
    }
    if (value === "K") {
      return 13;
    }
    if (value === "Q") {
      return 12;
    } else {
      return 11;
    }
  }
  console.log(value);
  return parseInt(value);
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  console.log(deck);
}
startGameBtn.addEventListener("click", function () {
  startGame();
});

restartBtn.addEventListener("click", function () {
  restartGame();
  startGame();
});

player1Deck.addEventListener("click", function () {
  while (rounds < 5 && player1Deck.length > 0 && computerDeck.length > 0) {
    flipCard();
    break;
  }
});

checkWinnerBtn.addEventListener("click", function () {
  console.log("check winner");
  checkWinner();
  playerCardSlot.innerHTML = [];
  compCardSlot.innerHTML = [];
});

function startGame() {
  createDeck();
  shuffleDeck(deck);
  player1Deck = deck.slice(0, 26);
  computerDeck = deck.slice(26);
  document.getElementById("player-counter").innerHTML = player1Deck.length;
  document.getElementById("comp-counter").innerHTML = computerDeck.length;
  document.getElementById("comp-card").style.visibility = "hidden";
  document.getElementById("status-text").style.visibility = "hidden";

  console.log(player1Deck);
  console.log(computerDeck);
}

function flipCard() {
  playerCard = player1Deck.pop();
  computerCard = computerDeck.pop();
  console.log(playerCard);
  console.log(computerCard);
  stop;
  document.querySelector("#status-text").innerHTML = "";
  getImage();
  document.getElementById("comp-card").style.visibility = "visible";
  document.getElementById("player-card").style.visibility = "visible";
}

function getImage() {
  let playerCardImg = document.createElement("img");
  playerCardImg.src = `./assets/cards/${playerCard}.png`;
  playerCardSlot.appendChild(playerCardImg);

  let computerCardImg = document.createElement("img");
  computerCardImg.src = `./assets/cards/${computerCard}.png`;
  compCardSlot.appendChild(computerCardImg);
}

function checkWinner() {
  const playerCardValue = getValue(playerCard);
  const computerCardValue = getValue(computerCard);
  if (playerCardValue > computerCardValue) {
    player1Deck.unshift(playerCard, computerCard);
    console.log(player1Deck, "player");
  } else if (playerCardValue < computerCardValue) {
    computerDeck.unshift(playerCard, computerCard);
    console.log(computerDeck, "comp");
  } else {
    player1Deck.unshift(playerCard);
    computerDeck.unshift(computerCard);
    console.log("Draw");
  }
  document.getElementById("player-counter").innerHTML = player1Deck.length;
  document.getElementById("comp-counter").innerHTML = computerDeck.length;
  if (rounds === 4) {
    displayWinner();
  } else {
  }
  document.getElementById("comp-card").style.visibility = "hidden";
  document.getElementById("player-card").style.visibility = "hidden";

  rounds++;
}

function restartGame() {
  deck = [];
  player1Deck = [];
  computerDeck = [];
  playerCardSlot.innerHTML = [];
  compCardSlot.innerHTML = [];
  document.querySelector("#status-text").innerHTML = "";
  rounds = 0;
}

function displayWinner() {
  document.getElementById("status-text").style.visibility = "visible";

  if (player1Deck.length > computerDeck.length) {
    document.querySelector("#status-text").innerHTML = "Player1 Wins!";
  } else if (player1Deck.length < computerDeck.length) {
    document.querySelector("#status-text").innerHTML = "Computer Wins!";
  } else {
    document.querySelector("#status-text").innerHTML = "Draw";
  }
}
