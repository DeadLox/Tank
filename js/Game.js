// Récupère le Context du Canvas
var c;
var ctx;
var tank;
var then = Date.now();

$(document).ready(function(){
	c = document.getElementById("gameZone");
	ctx = c.getContext("2d");

	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

  	// Crée un Tank
	tank = new Tank("DeadLox");

	// Ecoute les actions sur le claviers
	$(document).keydown(function(e){
		tank.move(e.keyCode);
	})

	setInterval(main, 1000 / 60);
});

function main(){
	var now = Date.now();
	var delta = now - then;
	
	render();

	then = now;
}

function render(){
	clearCanvas();
	ctx.drawImage(tank.image, tank.clipX, tank.clipY, tank.width, tank.height, tank.x, tank.y, tank.width, tank.height);
}

function clearCanvas(){
	ctx.clearRect(0, 0, c.width, c.height);
}