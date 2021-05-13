class Base {
	constructor() {
		this.x1 = 0;
		this.x2 = canvas.width;
		this.width = canvas.width;
		this.height = 50;
		this.y = canvas.height - this.height;
		this.moveSpeed = HORIZONTAL_SPEED;
	}
	draw() {
		const baseImg = new Image();
		baseImg.src = "assets/base.png";
		context.drawImage(baseImg, this.x1, this.y, this.width, this.height);
		context.drawImage(baseImg, this.x2, this.y, this.width, this.height);
	}
	update() {
		//repeatbackground
		if (this.x1 + this.width < 0) {
			this.x1 = canvas.width - this.moveSpeed;
		}
		if (this.x2 + this.x1 + this.width < 0) {
			this.x2 = canvas.width - this.moveSpeed;
		}
		this.x1 -= this.moveSpeed;
		this.x2 -= this.moveSpeed;
		this.draw();
	}
}
