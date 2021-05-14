const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const bothScores = document.querySelectorAll(".score");
const highScoreContainer = document.getElementById("high-score");
const gameOverOverlay = document.getElementById("game-over");
const startGameOverlay = document.getElementById("start-game");
const retryButton = document.getElementById("retry");
const startButton = document.getElementById("start");
gameOverOverlay.style.display = "none";

canvas.width = 550;
canvas.height = 700;

//game constants
const PIPE_GAP = 135;
const HORIZONTAL_SPEED = 5;
const PIPE_GENERATION_GAP = 70; //Frames

//to generate pipe every 60frames
let highScore = localStorage.getItem("highScore") || 0;
highScoreContainer.innerHTML = highScore;

let frames;
let pipes;
let score = 0;
let birdStartPosition = canvas.height / 2 - 60;
//bird
const bird = new Bird(150, birdStartPosition, 40, 30);
const base = new Base();
const background = new Image();
background.src = "assets/bg.png";
//gameLoop
let gameLoopId;
const gameLoop = () => {
	gameLoopId = requestAnimationFrame(gameLoop);
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(background, 0, 0, canvas.width, canvas.height);

	bird.update();
	if (collisionWithGround()) {
		gameOver();
	}
	//delay when first loading
	if (frames === 0) {
		setTimeout(() => generatePipes, 0);
	} else {
		generatePipes();
	}

	//update pipe position, remove pipes and detect collison
	pipes = pipes.filter((pipe) => {
		pipe.update();
		if (detectedCollisionBetween(bird, pipe)) {
			gameOver();
		}
		if (bird.x === pipe.x + pipe.width) {
			score++;
			updateScore(score);
		}
		if (pipe.x + pipe.width < 0) {
			return false;
		}
		return true;
	});
	base.update();

	frames++;
};
const gameOver = () => {
	cancelAnimationFrame(gameLoopId);
	highScoreContainer.innerHTML = highScore;
	gameOverOverlay.style.display = "flex";
};
//init

const initGame = () => {
	gameOverOverlay.style.display = "none";
	bird.reset();
	score = 0;
	bothScores.forEach((s) => {
		s.innerHTML = score;
	});

	pipes = [];
	frames = 0;
	gameLoop();
};

retryButton.addEventListener("click", initGame);
startButton.addEventListener("click", () => {
	startGameOverlay.style.display = "none";
	initGame();
});
