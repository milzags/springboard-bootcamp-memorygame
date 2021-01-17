const gameContainer = document.getElementById("gameboard");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "cyan",
  "magenta",
  "black",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "cyan",
  "magenta",
  "black",
];

let firstCard = null;
let firstCardFlipped = false;
let secondCard = null;
let secondCardFlipped = false;
let preventClick = false;
let flipCount = 0;
let highScore = localStorage.getItem('Score') | 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
};

let shuffledColors = shuffle(COLORS);
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
};


// Array.from(divsCollection).forEach((div) => {
//     divsArray.push(div);
// });

// console.log(divsArray);

// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    // console.log('clicked: ', event.target);
    // check here if the board is to allow card clicking.

    //make sure the cardOne or cardTwo are not active, if not, set the cardOne or cardTwo to the clicked card. Then compare the two cards. 

    let clickedCard = event.target;
    console.log(event.target);
    clickedCard.style.backgroundColor = clickedCard.className;
    // check if either card is clicked active and assign to the card values
    // if there was an active card, assign the click to the second card
    if (!firstCard) {
      clickedCard = firstCard;
      firstCardFlipped = true;
      
    } else if (!secondCard) {
      clickedCard = secondCard
      secondCardFlipped = true;
      
    };

    //if both cards are clicked, don't allow a click
    if (firstCard && secondCard) {
      preventClick = true;

      // if they are the same, remove the click listener, otherwise remove the color that was set (use set timeout function in else statement). Re-init the cards to null

      if (firstCard.style.backgroundColor === secondCard.style.backgroundColor) {
        firstCard.removeEventListener('click', handelCardClick);
        secondCard.removeEventListener('click', handleCardClick);
        firstCard = null;
        secondCard = null;
        firstCardFlipped = false;
        secondCardFlipped = false;
        preventClick = false;
      } else {
        setTimeout(function() {
          firstCard.style.backgroundColor = '';
          secondCard.style.backgroundColor = '';
          firstCardFlipped = false;
          secondCardFlipped = false;
          firstCard = null;
          secondCard = null;
          preventClick = false;
        }, 1000)
      } 
    }
}


      
// createArrayFromCollection(divsCollection);

// when the DOM loads
createDivsForColors(shuffledColors);

// function play() {
//   //create overlay for start game

// }

// document.addEventListener('DOMContentLoaded', () => {
//   play();
// })

let divsCollection = document.querySelectorAll('div');
let divsArray = [];

let newArray = Array.prototype.slice.call(divsCollection);

newArray.forEach((div => {
  divsArray.push(div);
}))

console.log(divsArray);