const topImage = new Image();
topImage.src = "assets/top-pipe.png";

const bottomImage = new Image();
bottomImage.src = "assets/bottom-pipe.png";

class Pipe {
	constructor(width, topPipeHeight) {
		this.width = width;
		this.topPipeHeight = topPipeHeight;
		this.x = canvas.width;
		this.topPipeY = 0;
		this.bottomPipeY = this.topPipeHeight + PIPE_GAP;
		this.bottomPipeHeight = canvas.height - this.bottomPipeY;
	}

	draw() {
		//top pipe

		context.drawImage(
			topImage,
			this.x,
			this.topPipeY,
			this.width,
			this.topPipeHeight
		);
		context.restore();

		//bottom pipe

		context.drawImage(
			bottomImage,
			this.x,
			this.bottomPipeY,
			this.width,
			this.bottomPipeHeight
		);
	}

	update() {
		this.x -= HORIZONTAL_SPEED;
		this.draw();
	}
}
