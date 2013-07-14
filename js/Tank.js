function Tank(name) {
	this.id = name;
	this.x = 100;
	this.y = 100;
	this.rotateZ = 0;
	this.pasRotate = 2;
	this.width = 62;
	this.height = 68;
	this.clipX = 74;
	this.clipY = 4;
	this.speed = 1;
	this.acceleration = 1;
	this.maxAcceleration = 15;
	this.lastMove = 0;
	this.image = new Image();
	this.image.src = 'img/sprites_tanks.png';

	var TO_RADIANS = Math.PI/180;

	this.draw = function(){
		this.move();
		ctx.save();
		ctx.translate(this.y + this.width/2, this.x + this.height/2);
		ctx.rotate(this.rotateZ * TO_RADIANS);
		ctx.drawImage(this.image, this.clipX, this.clipY, this.width, this.height, -this.width/2, -this.height/2, this.width, this.height);

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -150);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';
		ctx.stroke();

		ctx.restore();

		ctx.beginPath();
		ctx.moveTo(this.x + this.width/2, this.y + this.height/2);
		ctx.lineTo(this.x + this.width/2, this.y + this.height/2 - 150);
		ctx.arc(this.x + this.width/2, this.y + this.height/2, 50, 270 * TO_RADIANS, (this.rotateZ-90) * TO_RADIANS, false);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';
		ctx.stroke();

	}

	this.move = function() {
		if (leftKey) this.rotateZ -= this.pasRotate;
		if (rightKey) this.rotateZ += this.pasRotate;
		if (upKey) this.x -= this.speed * this.acceleration;
		if (downKey) this.x += this.speed * this.acceleration;
	}
	this.rotateLeft = function(){
		this.rotateZ -= 5;
		console.debug(this.rotateZ * TO_RADIANS);
	}
	this.rotateRight = function(){
		this.rotateZ += 5;
		console.debug(this.rotateZ * TO_RADIANS);
	}
	this.moveUp = function(){
		this.clipX = 74;
		this.clipY = 4;
		this.y -= this.speed + this.acceleration;
	}
	this.moveDown = function(){
		this.clipX = 200;
		this.clipY = 4;
		this.y += this.speed + this.acceleration;
	}
}