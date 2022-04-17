// Get All Important Elements
const moles = document.querySelectorAll(".mole");
const scoreSpan = document.querySelector(".score h3 span");
const startButton = document.querySelector("button");
const game = document.querySelector(".game");

// Declare Score Variable
let score = 0;

// Declare Seconds Variable
let seconds = 0;

// Declare Game Duration
let gameDuration = 15;

// Update Score
updateScore();

// Start Game Button Clicked
startButton.addEventListener("click", () => {
	if (!game.classList.contains("started")) {
		// Rest Score
		score = 0;

		// Reset Seconds
		seconds = 0;

		// Update Score
		updateScore();

		// Add Started Class
		addStarted();

		// Hide All Moles
		gameAction();

		// Add Event To Moles
		addEvent();

		// Show And Hide Random Moles Every 1 Second
		const showHideInterval = setInterval(() => {
			showHideMole();
		}, 1000);

		// Start A Timer For Game Duration
		const timerInterval = setInterval(() => {
			timer();
			if (seconds == gameDuration) {
				// Stop Game
				clearInterval(showHideInterval);
				setTimeout(() => {
					// Stop Timer
					clearInterval(timerInterval);
				}, 1000);
			}
		}, 1000);
	}
});

// Show Moles Function
function showMole(number) {
	moles[number].style.display = "inline-block";
}

// Hide Moles Function
function hideMole(number) {
	moles[number].style.display = "none";
}

// Show & Hide Moles Function
function showHideMole() {
	let randomNumber = Math.floor(Math.random() * 6);

	setTimeout(() => {
		showMole(randomNumber);
	}, 0);

	setTimeout(() => {
		hideMole(randomNumber);
	}, 600);
}

// Timer Function
function timer() {
	seconds++;
	if (seconds == gameDuration) {
		addStarted();
		setTimeout(() => {
			gameAction();
			addEvent();
		}, 1000);
	}
}

// Add Started Class To Game Function
function addStarted() {
	if (game.classList.contains("started")) {
		game.classList.remove("started");
	} else {
		game.classList.add("started");
	}
}

// Add & Remove Event Listeners To Moles
function addEvent() {
	if (game.classList.contains("started")) {
		for (let mole of moles) {
			mole.addEventListener("click", addPoint);
		}
	} else {
		for (let mole of moles) {
			mole.removeEventListener("click", addPoint);
		}
	}
}

// Add Points To Score Function
function addPoint() {
	score++;
	updateScore();
}

// Update Score Function
function updateScore() {
	scoreSpan.textContent = score;
}

// Hide & Show All Moles Function
function gameAction() {
	if (game.classList.contains("started")) {
		for (let mole of moles) {
			mole.style.display = "none";
		}
	} else {
		for (let mole of moles) {
			mole.style.display = "inline-block";
		}
	}
}