// Global Variables for the game
let cardList = [];
let shuffledDeck = [];
let openCardsStatus = 0;
let openCardLists = [];
let card1 = "";
let card2 = "";
let cards = document.getElementsByClassName("card");
let totalClickCount = 0;
let totalClickDisplay = document.querySelector(".moves");
let totalStars = 5;
let stars = document.querySelectorAll(".fa-star");
let winCheck = 8;
const restart = document.querySelector(".restart");
const frame = document.getElementsByTagName("ul")[1];


//Initialize timer with Javascript
let timeVar = setInterval(countTimer, 1000)
let totalSeconds = -1;
let minuteCount = 0
let secondsCount = 0

function countTimer() {
  ++totalSeconds
  let hour = Math.floor(totalSeconds / 3600);
  let minute = Math.floor((totalSeconds - hour * 3600) / 60);
  let seconds = totalSeconds - (hour * 3600 + minute * 60);

  minuteCount = minute
  secondsCount = seconds

  if (seconds < 10) {
    document.getElementById("timer").innerHTML =
      "0" + minute + ":" + "0" + seconds
  } else if (minute < 10) {
    document.getElementById("timer").innerHTML =
      minute + ":" + seconds
  } else if (minute < 10 && seconds < 10) {
    document.getElementById("timer").innerHTML =
      minute + ":" + "0" + seconds
  }

}

countTimer()


//allEventListener
frame.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    if (event.target.className.includes("show")) {
    } else {
      display(event);
    }
  }
});
restart.addEventListener("click", function (event) {
  reset();
});




//Won the game
function declareWIN() {
  const boxMessage = document.createElement("div");
  boxMessage.className = "messageBox";
  const boxCreate = document.querySelector("#main-heading");
  boxCreate.appendChild(boxMessage);

  const winMessage = document.createElement("p");
  winMessage.textContent = `Congratulation you won! You got ${totalStars}/5 stars`;
  winMessage.className = "message1";
  const winSelect = document.querySelector(".messageBox");
  winSelect.appendChild(winMessage);

  const winTime = document.createElement("p");
  if (secondsCount < 10) {
    winTime.textContent = "You took " + "0" + minuteCount + ":" + "0" + secondsCount;
  } else if (minuteCount < 10) {
    winTime.textContent = "You took " + "0" + minuteCount + ":" + secondsCount;
  } else if (minuteCount < 10 && secondsCount < 10) {
    winTime.textContent = "You took " + "0" + minuteCount + ":" + "0" + secondsCount;
  }
  winTime.classList = "message3";
  winSelect.appendChild(winTime);

  const resetButton = document.createElement("button");
  resetButton.textContent = "play again!";
  resetButton.classList = "bttn";
  resetButton.type = "button";
  winSelect.appendChild(resetButton);

  const clickResetButton = document.querySelector(".bttn");
  clickResetButton.addEventListener("click", function (event) {
    reset();
  });
}

//Rmove the won game
function removeWIN() {
  const rmWIN = document.querySelector(".messageBox");
  rmWIN.parentElement.removeChild(rmWIN);
}

//initiliaze the randomization of deck
function randomizeDeck() {
  //create Deck from HTML and removes elements that don't belong there
  function deckCreator() {
    deckContent = Array.from(cards);
    for (var i = 0; i < deckContent.length; i++) {
      deckContent[i].classList.remove("match");
      deckContent[i].classList.remove("open");
      deckContent[i].classList.remove("show");
    }
  }

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // conduct randomization on Deck (deckCreator)
  deckCreator();
  var deckContentShuffle = [];
  for (var i = 0; i < cards.length; i++) {
    deckContentShuffle.push(deckContent[i].innerHTML);
  }

  shuffledDeck = shuffle(deckContentShuffle);
  for (var i = 0; i < cards.length; i++) {
    cards[i].innerHTML = shuffledDeck[i];
  }
}

// resets the starts
function starResets() {
  let starz = document.querySelectorAll(".fa-star-o");
  for (var i = 0; i < starz.length; i++) {
    starz[i].classList = "fa fa-star";
  }
}

//display an open card on click
function display(event) {
  //opens card
  function open(event) {
    event.target.classList.add("open");
    event.target.classList.add("show");
  }

  //some logic to make sure only 2 cards is open
  if (openCardsStatus === 0) {
    open(event);
    openCardsStatus = 1;
    openCardLists.push(event.target);
  } else if (openCardsStatus === 1) {
    openCardsStatus = 2;
    open(event);
    openCardLists.push(event.target);
    totalClickCount += 1;
    totalClickDisplay.innerHTML = totalClickCount;
    setTimeout(checkMatch, 1000);

    //reduce stars when too much click
    if (totalClickCount === 20) {
      stars[4].classList = "fa fa-star-o";
      totalStars = totalStars - 1;
    } else if (totalClickCount === 25) {
      stars[3].classList = "fa fa-star-o";
      totalStars = totalStars - 1;
    } else if (totalClickCount === 30) {
      stars[2].classList = "fa fa-star-o";
      totalStars = totalStars - 1;
    } else if (totalClickCount === 35) {
      stars[1].classList = "fa fa-star-o";
      totalStars = totalStars - 1;
    } else if (totalClickCount === 40) {
      stars[0].classList = "fa fa-star-o";
      totalStars = totalStars - 1;
    }
  }
}

//Check if the cards that are opened matched
function checkMatch(event) {
  card1 = openCardLists[0];
  card2 = openCardLists[1];
  if (card1.firstElementChild.className === card2.firstElementChild.className) {
    card1.classList.add("match");
    card2.classList.add("match");
    card1 = "";
    card2 = "";
    winCheck = winCheck - 1;
    if (winCheck === 0) {
      clearInterval(timeVar)
      declareWIN();
    }
  } else {
    card1.classList.remove("open");
    card1.classList.remove("show");
    card2.classList.remove("open");
    card2.classList.remove("show");
  }
  openCardsStatus = 0;
  openCardLists = [];
}

//resets the whole thing
function reset() {
  randomizeDeck();
  starResets();
  if (winCheck === 0) {
    removeWIN();
  }
  totalClickCount = 0;
  totalClickDisplay.innerHTML = totalClickCount;
  winCheck = 8;
  totalStars = 5;
  minuteCount = 0
  secondsCount = 0
  card1 = "";
  card2 = "";
  cardList = []
  openCardLists = []
  shuffledDeck = []
  openCardsStatus = 0

  countTimer()
  clearInterval(timeVar)
  timeVar = setInterval(countTimer, 1000)
  totalSeconds = -1;

}

randomizeDeck();



/*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
