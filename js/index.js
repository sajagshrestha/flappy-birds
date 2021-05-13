const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 700;

//game constants
const PIPE_GAP = 180;
const HORIZONTAL_SPEED = 5;
const PIPE_GENERATION_GAP = 90; //Frames

//to generate pipe every 60frames
let frames;
let pipes;

//bird
const bird = new Bird(200, canvas.height / 2, 50, 50);

//gameLoop
let gameLoopId;
const gameLoop = () => {
	gameLoopId = requestAnimationFrame(gameLoop);
	context.clearRect(0, 0, canvas.width, canvas.height);

	bird.update();
	generatePipe();

	//update pipe position, remove pipes and detect collison
	pipes = pipes.filter((pipe) => {
		pipe.update();
		if (detectedCollisionBetween(bird, pipe)) {
			cancelAnimationFrame(gameLoopId);
		}
		if (pipe.x + pipe.width < 0) {
			return false;
		}
		return true;
	});
	frames++;
};

//init
pipes = [];
frames = 0;
gameLoop();
