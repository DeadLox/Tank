
	// notre websocket
var socket;
	// l'url vers notre serveur websocket (127.0.0.1 -> ip du serveur ici em local, 8000 -> le port qui interceptera nos messages)
var host = "ws://127.0.0.1:8000/";

	// le nom de notre application
var application = 'tank';

	// le pseudo du visiteur
var pseudo = '';

	// retourne un élément en fonction de son ID
function getid(a) {
	return document.getElementById(a);
}

// on attent que la page soit chargée
window.onload = function() {
		// on créer notre socket
	socket = new createSocket(host, application);
	
		// une fois quelle est ouverte, on affiche un message comme quoi l'utilisateur est bien connecté
	socket.onopen = function() {
		echo('<p class="important">connexion ouverte</p><br>');
			//on en profite pour lui demander de choisir un pseudo
		selectName();
		loadTank();

		$(document).keypress(function(e){
			move(e.keyCode);
		});
	}
	
		// quand un message survient, on l'affiche
	socket.onmessage = function(msg) {
		console.log(msg);
		echo(msg.position+" "+msg.data);
	}
	
		// quand la connexion est fermée, on l'indique à l'utilisateur
	socket.onclose = function() {
		echo('<p class="important">connexion fermée</p><br>');
	}
}

	// demande à l'utilisateur un pseudo, on vérifie en même temps s'il n'est pas déjà pris
function selectName() {
	var payload = new Object();				
	payload['action'] = 'nickselect';
	payload['data'] = prompt('Pseudo :');	
	socket.send(payload);	
}

	// envoie un message au serveur
function send()	{
	var txt = getid('text').value;
	
	var payload = new Object();				
	payload['action'] = 'msg';
	payload['data'] = txt;	
				
	socket.send(payload );
	getid('text').value = "";
}

	// affiche un message
function echo(text) {
	getid('log').innerHTML += text + "<br>";
}

function loadTank() {
	$('#gameZone').prepend('<div class="tank"></div>')
}

function move(keyCode){
	switch(keyCode){
		case keyCode = 37:
			echo("Touche gauche");
			break;
		case keyCode = 38:
			echo("Touche haut");
			break;
		case keyCode = 39:
			echo("Touche droite");
			break;
		case keyCode = 40:
			echo("Touche bas");
			break;
	}
}