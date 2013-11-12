function modTick() {
	clientMessage(randomStuff());
}

function randomStuff() {
	var chars = new Array(60);
	for(var i = 0; i < 60; i++) {
		var mychar;
		if (Math.random() < 0.3) {
			mychar = "\u00a7";
		} else if (Math.random() < 0.8) {
			mychar = String.fromCharCode(Math.floor(Math.random() * 0x60) + 0x20);
		} else {
			mychar = String.fromCharCode(Math.floor(Math.random() * 0x10000));
		}
		chars.push(mychar);
	}
	return chars.join("");
}
