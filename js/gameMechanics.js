window.addEventListener("keydown", (e) => {
	if (e.code === "Space") {
		bird.fly();
	}
});
window.addEventListener("keyup", (e) => {
	if (e.code === "Space") {
		bird.stopFlying();
	}
});

generatePipes = () => {
	if (frames % PIPE_GENERATION_GAP === 0) {
		let topPipeHeight = generateRandomIntegerBetween(
			90,
			canvas.height / 2 + 20
		);
		pipes.push(new Pipe(100, topPipeHeight));
	}
};

//detect collision between both pipes and ground
detectedCollisionBetween = (bird, pipe) => {
	if (
		//collision with top pipe
		(bird.x < pipe.x + pipe.width &&
			bird.x + bird.width > pipe.x &&
			bird.y < pipe.topPipeY + pipe.topPipeHeight &&
			bird.y + bird.height > pipe.topPipeY) ||
		//or collision with bottom pipe
		(bird.x < pipe.x + pipe.width &&
			bird.x + bird.width > pipe.x &&
			bird.y < pipe.bottomPipeY + pipe.bottomPipeHeight &&
			bird.y + bird.height > pipe.bottomPipeY)
	) {
		return true;
	}
};

//not included in detectedCollsion to add delay to pipe generation
const collisionWithGround = () => {
	if (bird.y + bird.height >= canvas.height - base.height) {
		return true;
	}
};

const updateScore = (score) => {
	bothScores.forEach((s) => {
		s.innerHTML = score;
	});
	if (score >= highScore) {
		highScore = score;
		localStorage.setItem("highScore", highScore);
	}
};
