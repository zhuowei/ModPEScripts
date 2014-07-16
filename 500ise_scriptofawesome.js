var P = Player;
var E = Entity;
var M = ModPE;
var B = Block;
var L = Level;
var p;
var activated;
function procCmd(cmd) {
	if (cmd == "awesome") {
		activated = !activated;
		return;
	}
	if (!activated) return;
	p = getPlayerEnt();
	var retval = eval(cmd);
	clientMessage(String(retval));
}
