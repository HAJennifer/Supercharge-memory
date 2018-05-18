$(document).ready(function()
{
  startTimer();
  
});

const container = document.querySelector('.container');
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const winnerModal = document.getElementById('winner-modal');
const restart = document.querySelector(".restart");
var match = document.querySelector(".match");
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");


var closeButton = document.querySelector(".close-button");

/*
 * Create a list that holds all of your cards
 */
const cards = document.getElementsByClassName('card');
//Array of cards
let listOfCards = Array.from(cards);
listOfCards = shuffle(listOfCards);
addShuffledCards();


function addShuffledCards() {
	deck.innerHTML = '';
	for (let i = 0; i < listOfCards.length; i++) {
		deck.innerHTML += listOfCards[i].outerHTML;
	}
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
let openListOfCards = [];
let moveCounter = 0;

moves.innerText = moveCounter;

deck.addEventListener('click', function(event) {
  card = event.target;
  if(!card.classList.contains('open')){
	showCard(event);
	addToList(event); 
	compareCards();
  countMoves(event);
  }
});

 function clearInterval(){
 second = 0;
 minute = 0; 
 var timer = document.querySelector(".timer");
 timer.innerHTML = "0 mins 0 secs";
 };

function addToList(card) {
	openListOfCards.push(card);
}

function showCard(card) {
	card.target.classList.toggle('open');
	card.target.classList.toggle('show');   
}

function compareCards() {
	if(openListOfCards.length > 1) {
		if(openListOfCards[0].target.innerHTML === openListOfCards[1].target.innerHTML) {
			console.log('Nice job it is a match!');
			ifPair(openListOfCards);
		} else {
			console.log('Nice try but not a match!');
			notPair(openListOfCards);
		}
			openListOfCards = [];
	}
}

function ifPair(cards) {
	for (card of cards) {
		card.target.classList.toggle('match');
		match++;
	}
}

function notPair(cards) {
	setTimeout(function() {
		for (card of cards) {
			card.target.classList.remove('open');
			card.target.classList.remove('show');
		}
	}, 800);
}

function countMoves(card) {
	if (card.target.classList[0] === 'card') {
		moveCounter++;
		moves.innerText = moveCounter;
    if (moveCounter >30 && moveCounter < 40){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moveCounter > 40){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
}
     if(match===16){
    winner();
  }
	}
  }
}
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
    },1000);
}
 
$('.restart').click(function() {
   restartGame();
    });
function restartGame(){
      document.querySelector(".moves").innerText = "0";
      document.querySelector('.timer').innerHTML = "0mins 0secs";
 second = 0;
 minute = 0; 
 hour = 0; 
 $('.card').removeClass('open match');
 $('.card').removeClass('show');
 moveCounter=0;
 countMoves();
 shuffle(array);
 addShuffledCards();

 };
function winner(){
 
   winnerModal.style.display='block';
   document.getElementById('winner-message').innerHTML = "You win! You completed the game in "+moveCounter+" moves and in "+second+"seconds"+"!";
	if (moveCounter > 0 && moveCounter < 30) {
		document.getElementById('star-rating-message').innerHTML = "<i class='fa fa-star'><i class='fa fa-star'><i class='fa fa-star'>";
	}
	if (moveCounter > 30 && moveCounter < 40) {
	document.getElementById('star-rating-message').innerHTML = "<i class='fa fa-star'><i class='fa fa-star'>";
	}
	if (moveCounter > 40) {
	document.getElementById('star-rating-message').innerHTML = "<i class='fa fa-star'>";
	}

}
document.querySelector(".playAgain").addEventListener("click", function() {
 window.location.assign("https://hajennifer.github.io/Supercharge-memory/")

});
