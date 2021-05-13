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

generatePipe = () => {
	if (frames % PIPE_GENERATION_GAP === 0) {
		let topPipeHeight = generateRandomIntegerBetween(
			120,
			canvas.height / 2 + 60
		);
		pipes.push(new Pipe(120, topPipeHeight));
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
			bird.y + bird.height > pipe.bottomPipeY) ||
		//or collsion with ground
		bird.y + bird.height >= canvas.height
	) {
		return true;
	}
	return false;
};
