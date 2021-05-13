class Bird {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.vy = 0;
		this.gravity = 0.3;
	}

	draw() {
		context.filStyle = "blue";
		context.fillRect(this.x, this.y, this.width, this.height);
	}

	update() {
		this.vy += this.gravity;
		this.y += this.vy;

		//prevent bird from flying out of canvas
		if (this.y <= 0) {
			this.y = 0;
		}
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
}
