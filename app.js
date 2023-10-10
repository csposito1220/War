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

const deck = [];

// let running = false;

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
  return parseInt(value);
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  console.log(deck);
}

function startGame() {
  shuffleDeck(deck);
  const player1Deck = deck.slice(0, 26);
  const player2Deck = deck.slice(26);
  let rounds = 0;

  while (rounds < 5 && player1Deck.length > 0 && player2Deck.length > 0) {
    const card1 = player1Deck.pop();
    const card2 = player2Deck.pop();

    if (values.indexOf(card1.value) > values.indexOf(card2.value)) {
      player1Deck.unshift(card1, card2);
    } else if (values.indexOf(card1.value) < values.indexOf(card2.value)) {
      player2Deck.unshift(card1, card2);
    } else {
      const pot = [card1, card2];
      let warWinner = null;

      while (!warWinner) {
        const card1War = player1Deck.pop();
        const card2War = player2Deck.pop();
        pot.unshift(card1War, card2War);

        if (card1War && card2War) {
          if (values.indexOf(card1War.value) > values.indexOf(card2War.value)) {
            warWinner = "player1";
          } else if (
            values.indexOf(card1War.value) < values.indexOf(card2War.value)
          ) {
            warWinner = "player2";
          }
        } else {
          // If one of the players runs out of cards during the war
          warWinner = card1War ? "player1" : "player2";
          break;
        }
      }

      if (warWinner === "player1") {
        player1Deck.unshift(...pot);
      } else {
        player2Deck.unshift(...pot);
      }
    }

    rounds++;
  }
  displayWinner(player1Deck.length, player2Deck.length);
}

function displayWinner(player1Cards, player2Cards) {
  if (player1Cards > player2Cards) {
    document.querySelector("status-text").innerText = "Player1 Wins!";
  } else if (player1Cards < player2Cards) {
    document.querySelector("status-text").innerText = "Player2 Wins!";
  } else {
    document.querySelector("statues-text").innerText = "Draw";
  }
}
