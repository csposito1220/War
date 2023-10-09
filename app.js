const compDeck = document.querySelector("#comp-deck");
const compCard = document.querySelector("#comp-card");
const playerCard = document.querySelector("#player-card");
const playerDeck = document.querySelector("#player-deck");
let cardValue = document.querySelectorAll(".card-value");
let cardSuit = document.querySelectorAll(".card-suit");

const suits = ["♠", "♣", "♥", "♦"];
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

function createDeck() {
  const deck = [];

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
      return 11;
    } else {
      return 10;
    }
  }
}
