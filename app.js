let computerDeck = document.querySelector("#comp-deck");
let compCardSlot = document.querySelector("#comp-card");
let playerCardSlot = document.querySelector("#player-card");
let player1Deck = document.querySelector("#player-deck");
let cardValue = document.querySelectorAll(".card-value");
let cardSuit = document.querySelectorAll(".card-suit");
const startGameBtn = document.getElementById("start-game");
const restartBtn = document.getElementById("restart");
const checkWinnerBtn = document.getElementById("check-winner");

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

  console.log(player1Deck);
  console.log(computerDeck);
}

function flipCard() {
  playerCard = player1Deck.pop();
  computerCard = computerDeck.pop();
  console.log(playerCard);
  console.log(computerCard);

  playerCardSlot.append(playerCard);
  compCardSlot.append(computerCard);
  stop;
  // getImage();
}

// function getImage(card) {
//   let cardImg = document.createElement("img");
//   cardImg.src = `./assets/cards/${card}.png`;
//   if (player === "player1") {
//     playerCardSlot.appendChild(cardImg);
//   } else if (player === "computer") {
//     compCardSlot.appendChild(cardImg);
//   }
// }

function checkWinner() {
  const playerCardValue = getValue(playerCard);
  const computerCardValue = getValue(computerCard);
  // getValue(playerCard);
  if (playerCardValue > computerCardValue) {
    player1Deck.unshift(playerCard, computerCard);
    console.log(player1Deck, "player");
  } else if (playerCardValue < computerCardValue) {
    computerDeck.unshift(playerCard, computerCard);
    console.log(computerDeck, "comp");
  } else {
    const pot = [playerCard, computerCard];
    let warWinner = null;

    while (!warWinner) {
      const card1War = player1Deck.pop();
      const card2War = computerDeck.pop();
      pot.unshift(card1War, card2War);

      if (card1War && card2War) {
        if (values.indexOf(card1War.value) > values.indexOf(card2War.value)) {
          warWinner = "player1";
        } else if (
          values.indexOf(card1War.value) < values.indexOf(card2War.value)
        ) {
          warWinner = "computer";
        }
      } else {
        // If one of the players runs out of cards during the war
        warWinner = card1War ? "player1" : "computer";
        break;
      }
    }

    if (warWinner === "player1") {
      player1Deck.unshift(...pot);
    } else {
      computerDeck.unshift(...pot);
    }
  }

  displayWinner(player1Deck.length, computerDeck.length);
  rounds++;
}

function restartGame() {
  deck = [];
  player1Deck = [];
  computerDeck = [];
  playerCardSlot.innerHTML = [];
  compCardSlot.innerHTML = [];
}

function displayWinner(player1Cards, computerCards) {
  if (player1Cards > computerCards) {
    document.querySelector("status-text").innerHTML = "Player1 Wins!";
  } else if (player1Cards < computerCards) {
    document.querySelector("status-text").innerHTML = "Computer Wins!";
  } else {
    document.querySelector("status-text").innerHTML = "Draw";
  }
}
