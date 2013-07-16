function Fire(){
	this.x = 300;
	this.y = 100;
	this.width = 66;
	this.height = 174;
	this.totalWidth = 1856;
	this.clipX = 0;
	this.clipY = 0;
	this.image = new Image();
	this.image.src = 'img/rocket.png';

	this.draw = function(){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.image, this.clipX, this.clipY, this.width, this.height, -this.width/2, -this.height/2, this.width, this.height);
		ctx.restore();

		this.animate();
	}
	this.animate = function() {
		this.clipX += this.width;
		if (this.clipX > this.totalWidth) {
			this.clipX = 0;
		}
	}
}