//Constant variables
const squares = document.querySelectorAll('.square');
const message = document.querySelector('#message');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const strictButton = document.querySelector('#strict');
 //Adding sounds
const sounds = [
	new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
	new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
	new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
	new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
];

function playSound(id) {
	sounds[id].play();
}
// Defining variables
let inputEnabled = false;
let simonStep = [];
let userStep = 0;
let timeout;
// let strict = false;

//Using "for"loop to initialize the first step 
for(i=0; i<squares.length; i++) {
	const val = i; 
	squares[i].onclick = function() {
		if(!inputEnabled) return;
        
        //Conditional statements (logic of the game)
	    playSound(val);
		if(val === simonStep[userStep]) {
			if(userStep+1 === simonStep.length) {
					inputEnabled = false;
					if(simonStep.length < 4) {
						generateLastStep();
                        message.innerHTML = "GOOD JOB!"
                        
                        //Setting a timer and executing a callback function
						timeout = setTimeout(showSteps, 1000);
						userStep = 0;
					}
					else {
						message.innerHTML = "YOU WON!!!!!";
						timeout = setTimeout(reset, 1000);
					}	
			}
			else {
				userStep++;
			}
		}
		else {
			message.innerHTML = "OOPS TRY AGAIN!";
			inputEnabled = false;
			setTimeout(function() {
				if(strict) {
					reset();
				}
				else {
					userStep = 0;
					inputEnabled = false;
					message.innerHTML = "WATCH THE STEPS!";
					timeout = setTimeout(showSteps, 1000);
				}
			}, 1000);

		}
	}
}
//DOM elements
startButton.onclick = function() {
	this.disabled = true;
	start();
}
//Initializing the start of the game after reset button
resetButton.onclick = reset;
//Clearing the timer
function reset() {
	startButton.disabled = false;
	simonStep = [];
	userStep = 0;
	inputEnabled = false;
	clearTimeout(timeout);
	message.innerHTML = "Let's Play Simon Game!";
}

//DOM elements
function start() {
	generateLastStep();
	message.innerHTML = 'REPEAT THE STEPS!';
	timeout = setTimeout(showSteps, 1000);
}


function generateLastStep() {
	simonStep.push(rand(0, 3));
}
//Another DOM manipulation that shows the amount of steps
function showSteps() {
	if(userStep > simonStep.length-1) {
		userStep = 0;
		message.innerHTML = simonStep.length+' steps';
		inputEnabled = true;
		return;
	}
	var id = simonStep[userStep];
//Function that connects the sounds with flashing of the squares, squares 
//become "active"
	playSound(id);
	squares[id].className += ' active';

	setTimeout(function() {

		squares[id].className = squares[id].className.replace(' active', '');

		userStep++;

		timeout = setTimeout(showSteps, 0.3*1000);

	}, 0.6*1000);

	message.innerHTML = "Repeat the Steps!";
}
//Random function 
function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
