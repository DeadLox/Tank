function Tank(name) {
	this.id = name;
	this.x = 0;
	this.y = 0;
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

	this.move = function(keyCode){
		if (this.lastMove == keyCode) {
			if (this.acceleration < this.maxAcceleration) {
				this.acceleration++;
			}	
		} else {
			this.acceleration = 1;
		}
		this.lastMove = keyCode;
		switch (keyCode) {
			case keyCode = 37:
				this.moveLeft();
				break;
			case keyCode = 38:
				this.moveUp();
				break;
			case keyCode = 39:
				this.moveRight();
				break;
			case keyCode = 40:
				this.moveDown();
				break;
		}
	}
	this.moveLeft = function(){
		this.clipX = 13;
		this.clipY = 4;
		this.x-= this.speed * this.acceleration;
	}
	this.moveUp = function(){
		this.clipX = 74;
		this.clipY = 4;
		this.y-= this.speed + this.acceleration;
	}
	this.moveRight = function(){
		this.clipX = 136;
		this.clipY = 4;
		this.x+= this.speed * this.acceleration;
	}
	this.moveDown = function(){
		this.clipX = 200;
		this.clipY = 4;
		this.y+= this.speed + this.acceleration;
	}
}