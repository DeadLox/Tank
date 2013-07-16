function Tank(name) {
	this.id = name;
	this.x = 100;
	this.y = 100;
	this.z = 0;
	this.xMov = 0;
	this.yMov = 0;
	this.rotateZ = 0;
	this.pasRotate = 0.5;
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

	/* DEBUG */
	this.enableDebug = false;
	this.DEBUGDrawMultiplier = 50;

	this.draw = function(){
		this.move();
		ctx.save();
		ctx.translate(this.x + this.height/2, this.y + this.width/2);
		ctx.rotate(this.rotateZ * TO_RADIANS);
		ctx.drawImage(this.image, this.clipX, this.clipY, this.width, this.height, -this.width/2, -this.height/2, this.width, this.height);

		// Droite angle
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -150);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.stroke();

		ctx.restore();

		ctx.beginPath();
		// Droite verticale
		ctx.moveTo(this.x + this.width/2 + 3, this.y + this.height/2 - 150 - 3);
		ctx.lineTo(this.x + this.width/2 + 3, this.y + this.height/2 - 3);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.beginPath();
		// Angle de rotation
		ctx.arc(this.x + this.width/2 + 3, this.y + this.height/2 - 3, 50, 270 * TO_RADIANS, (this.rotateZ-90) * TO_RADIANS, false);
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
		ctx.stroke();

		ctx.beginPath();
		// Droite axe X
		ctx.moveTo(this.x + this.width/2 + 3, this.y + this.height/2 - 3);
		ctx.lineTo(this.x + this.width/2 + 3 + (this.xMov*this.DEBUGDrawMultiplier), this.y + this.height/2 - 3);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'red';
		ctx.stroke();
		// Droite axe Y
		ctx.moveTo(this.x + this.width/2 + 3 + (this.xMov*this.DEBUGDrawMultiplier), this.y + this.height/2 - 3);
		ctx.lineTo(this.x + this.width/2 + 3 + (this.xMov*this.DEBUGDrawMultiplier), this.y + this.height/2 - 3 + (this.yMov*this.DEBUGDrawMultiplier));
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'blue';
		ctx.stroke();
		ctx.beginPath();

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
		this.rotateZ = arr(this.rotateZ - this.pasRotate, 1);
		if (this.rotateZ < 0) this.rotateZ = 360;
		this.calcAngle();
		this.calcMov();
	}
	this.rotateRight = function(){
		this.rotateZ = arr(this.rotateZ + this.pasRotate, 1);
		if (this.rotateZ > 360) this.rotateZ = 0;
		this.calcAngle();
		this.calcMov();
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
		//this.acceleration++;
		if (this.acceleration > this.maxAcceleration) this.acceleration = this.maxAcceleration; 
	}
	this.calcAngle = function(){
		this.angle = arr((this.rotateZ - (Math.round(parseInt(this.rotateZ/90))*90)), 2);
	}
	this.calcMov = function(){
		this.z = this.speed + this.acceleration;
		if (this.rotateZ >= 0 && this.rotateZ <= 90) {
			this.yMov = -this.calcX();
			this.xMov = this.calcY();
		} else if (this.rotateZ >= 90 && this.rotateZ <= 180) {
			this.xMov = this.calcX();
			this.yMov = this.calcY();
		} else if (this.rotateZ >= 180 && this.rotateZ <= 270) {
			this.yMov = this.calcX();
			this.xMov = -this.calcY();
		} else if (this.rotateZ >= 270 && this.rotateZ <= 360) {
			this.xMov = -this.calcX();
			this.yMov = -this.calcY();
		}
	}
	this.calcX = function(){
		var movX = arr(Math.cos(this.angle * TO_RADIANS), 2) * this.z;
		return movX;
	}
	this.calcY = function(){
		var movY = arr(Math.sin(this.angle * TO_RADIANS), 2) / this.z;
		return movY;
	}
	this.calcMove = function(){
		this.calcMov();
		this.x += this.xMov;
		this.y += this.yMov;
	}
	this.debug = function(){
		logger('x', this.x);
		logger('y', this.y);
		logger('z', this.z);
		logger('Vitesse', this.speed);
		logger('Acceleration', this.acceleration);
		logger('Pas_rotation', this.pasRotate);
		logger('rotateZ', this.rotateZ);
		logger('angle', this.angle);
		logger('xMov', this.xMov);
		logger('yMov', this.yMov);
	}
}