function Tank(name) {
	this.id = name;
	this.x = 100;
	this.y = 100;
	this.rotateZ = 0;
	this.pasRotate = 2;
	this.angle = 0;
	this.width = 62;
	this.height = 68;
	this.clipX = 74;
	this.clipY = 4;
	this.speed = 1;
	this.acceleration = 0;
	this.maxAcceleration = 3;
	this.lastMove = 0;
	this.image = new Image();
	this.image.src = 'img/sprites_tanks.png';

	var TO_RADIANS = Math.PI/180;

	this.draw = function(){
		this.move();
		ctx.save();
		ctx.translate(this.x + this.height/2, this.y + this.width/2);
		ctx.rotate(this.rotateZ * TO_RADIANS);
		ctx.drawImage(this.image, this.clipX, this.clipY, this.width, this.height, -this.width/2, -this.height/2, this.width, this.height);

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -150);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.stroke();

		ctx.restore();

		ctx.beginPath();
		ctx.moveTo(this.x + this.width/2 + 3, this.y + this.height/2 - 150 - 3);
		ctx.lineTo(this.x + this.width/2 + 3, this.y + this.height/2 - 3);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(this.x + this.width/2 + 3, this.y + this.height/2 - 3, 50, 270 * TO_RADIANS, (this.rotateZ-90) * TO_RADIANS, false);
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
		ctx.stroke();

		this.debug();
	}

	this.move = function() {
		if (leftKey) this.rotateLeft();
		if (rightKey) this.rotateRight();
		if (upKey) this.moveUp();
		if (downKey) this.moveDown();
		if (!upKey && !downKey) this.acceleration = 0;
	}
	this.rotateLeft = function(){
		this.rotateZ -= this.pasRotate;
		if (this.rotateZ < 0) this.rotateZ = 360;
		this.calcAngle();
	}
	this.rotateRight = function(){
		this.rotateZ += this.pasRotate;
		if (this.rotateZ > 360) this.rotateZ = 0;
		this.calcAngle();
	}
	this.moveUp = function(){
		this.clipX = 74;
		this.clipY = 4;
		this.calcMove();
		this.accelerate();
	}
	this.moveDown = function(){
		this.clipX = 200;
		this.clipY = 4;
		this.calcMove();
		this.accelerate();
	}
	this.accelerate = function(){
		this.acceleration++;
		if (this.acceleration > this.maxAcceleration) this.acceleration = this.maxAcceleration; 
	}
	this.calcAngle = function(){
		this.angle = this.rotateZ - (Math.round(parseInt(this.rotateZ/90))*90);
	}
	this.calcX = function(){
		var pas = this.speed + this.acceleration;
		return pas * Math.cos(this.angle);
	}
	this.calcY = function(){
		var pas = this.speed + this.acceleration;
		return pas * Math.cos(this.angle);
	}
	this.calcMove = function(){
		this.x = this.calcX();
		this.y = this.calcY();
	}
	this.debug = function(){
		logger('x', this.x);
		logger('y', this.y);
		logger('Acceleration', this.acceleration);
		logger('rotateZ', this.rotateZ);
		logger('angle', this.angle);
	}
}