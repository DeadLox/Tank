// Récupère le Context du Canvas
var c;
var ctx;
var tank;
var FPS = 100;

var rightKey = false;
var leftKey = false;
var upKey = false;
var downKey = false;

$(document).ready(function(){
	c = document.getElementById("gameZone");
	ctx = c.getContext("2d");

	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

  	// Crée un Tank
	tank = new Tank("DeadLox");

	// Ecoute les actions sur le claviers
	$(document).keydown(function(e){
		onKeyDown(e);
	})
	$(document).keyup(function(e){
		onKeyUp(e);
	})

	setInterval(function(){
		update();
		render();
	}, 1000/FPS);
});

function update(){
}

function render(){
	ctx.clearRect(0, 0, c.width, c.height);
	tank.draw();
}

function onKeyDown(evt) {
	if (evt.keyCode == 39) rightKey = true;
	else if (evt.keyCode == 37) leftKey = true;
	else if (evt.keyCode == 38) upKey = true;
	else if (evt.keyCode == 40) downKey = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) rightKey = false;
  else if (evt.keyCode == 37) leftKey = false;
  else if (evt.keyCode == 38) upKey = false;
  else if (evt.keyCode == 40) downKey = false;
}