const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = 550;
canvas.height = 700;

//game constants
const PIPE_GAP = 150;
const HORIZONTAL_SPEED = 5;
const PIPE_GENERATION_GAP = 70; //Frames

//to generate pipe every 60frames
let frames;
let pipes;

//bird
const bird = new Bird(150, canvas.height / 2 - 50, 50, 50);
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
	if (frames == 0) {
		setTimeout(() => generatePipes(), 0);
	} else {
		generatePipes();
	}

	//update pipe position, remove pipes and detect collison
	pipes = pipes.filter((pipe) => {
		pipe.update();
		if (detectedCollisionBetween(bird, pipe)) {
			gameOver();
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
};
//init
pipes = [];
frames = 0;
gameLoop();
