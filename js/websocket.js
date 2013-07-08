function createSocket(host, applicationName) {
	
	var parent = this;
	
	this.init = function(host) {	
		if(window.MozWebSocket) {
			window.WebSocket = window.MozWebSocket;
		}
		
		if(!window.WebSocket) { 
			console.log('Votre navigateur ne supporte pas les webSocket!');
			return false;
		}
		
		try	{
			parent.socket = new WebSocket(host, applicationName);
		} catch(exception) { 
			console.log("Url incorrecte ou serveur déconnecté !");
			return false;
		}
		
		parent.socket.onerror = function() { parent.onerror(); }
		parent.socket.onopen = function() { parent.onopen(); }
		parent.socket.onmessage = function(msg){
			try { 
				data = JSON.parse(msg.data);
			} catch(exception) {
				data = msg.data
			}
				
			parent.onmessage(data);
		}
		parent.socket.onclose = function() {	parent.onclose(); }
	}
	
	this.onerror = function() {}
	this.onopen = function() {}
	this.onmessage = function(msg) {}
	this.onclose = function(){}
	
	this.send = function(data) {
		if(data == "") { return false; }
		
		if(typeof data == 'object') {
			data = JSON.stringify(data);
		}
		
		try{  
			this.socket.send(data); 
			return true;
		} catch(exception) {  
			return false;
		}
	}
	
	this.close = function() {
		parent.socket.close();
	}
	
	this.init(host, applicationName);
}