var P = Player;
var E = Entity;
var M = ModPE;
var B = Block;
var L = Level;
var p;
var x, y, z;
var activated;
function procCmd(cmd) {
	if (cmd == "awesome") {
		activated = !activated;
		clientMessage("You are " + (activated? "": "not ") + "awesome");
		return;
	}
	if (!activated) return;
	p = getPlayerEnt();
	x = getPlayerX();
	y = getPlayerY();
	z = getPlayerZ();
	var retval = eval(cmd);
	clientMessage(String(retval));
}
