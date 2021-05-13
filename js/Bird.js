const birdImg = new Image();
birdImg.src = "assets/bird-sprite.png";

class Bird {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.vy = 0;
		this.gravity = 0.3;
		this.frameX = 0;
	}

	draw() {
		context.filStyle = "blue";

		context.drawImage(
			birdImg,
			this.frameX * (this.width + 25),
			0,
			this.width + 18,
			this.height + 16,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	update() {
		this.vy += this.gravity;
		this.y += this.vy;

		//prevent bird from flying out of canvas
		if (this.y <= 0) {
			this.y = 0;
		}
		if (this.y + this.height > canvas.height - 50) {
			this.vy = 0;
		}
		if (this.frameX >= 2) this.frameX = 0;
		else if (frames % 10 === 0) this.frameX++;
		this.draw();
	}

	fly() {
		this.vy -= 12;
		if (this.vy < -20) {
			this.vy = -10;
		}
	}

	stopFlying() {
		this.vy = 0;
	}
	reset() {
		this.y = birdStartPosition;
	}
}
