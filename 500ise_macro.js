var macroRecordMode = false; //Macro script by 500 Internal Server Error
var macroLines, macroBinds; //I release this under Creative Commons CC0. TLDR: do whatever you want with it. I don't care.
var macroUsage = "Usage: /macro record to start recording\n /macro <name> to stop recording\n /macro play <name> to play back macro\n" + 
" /macro bind <name> to bind macro to current item";
function macroProcCmd(cmd) {
	var data = cmd.split(" ");
	if (macroRecordMode) {
		if (data[0] == "macro") {
			macroRecordMode = false;
			ModPE.saveData("500ise_macro_" + data[1], JSON.stringify(macroLines));
			clientMessage("Recorded. run /macro play " + data[1] + " to replay.");
		} else {
			macroLines.push(cmd);
		}
		return;
	}
	if (data[0] != "macro") return;
	if (data.length < 2) {
		clientMessage(macroUsage);
	} else if (data[1] == "record") {
		macroRecordMode = true;
		clientMessage("Recording macro: /macro <name> to stop");
		macroLines = [];
	} else if (data[1] == "play") {
		var lines = JSON.parse(ModPE.readData("500ise_macro_" + data[2]));
		for (var i = 0; i < lines.length; i++) 
			net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod("procCmd", [lines[i]]);//Will make a proper API for this later.
	} else if (data[1] == "bind") {
		if (!macroBinds) macroBinds = macroLoadDict("500ise_macrobinds");
		macroBinds[getCarriedItem()] = data[2];
		ModPE.saveData("500ise_macrobinds", JSON.stringify(macroBinds));
	} else {
		clientMessage(macroUsage);
	}
}
function macroUseItem(x, y, z, itemId, blockId, side) {
	if (!macroBinds) macroBinds = macroLoadDict("500ise_macrobinds");
	if (macroBinds[itemId]) macroProcCmd("macro play " + macroBinds[itemId]);
}
function macroLoadDict(name) {
	var a = ModPE.readData("500ise_macrobinds");
	return a == ""? {}: JSON.parse(a);
}//copy the stuff above as-is, no need for modification.
function procCmd(cmd) { 
	macroProcCmd(cmd); //copy this line to the top of your procCmd 

}
function useItem(x, y, z, itemId, blockId, side) {
	macroUseItem(x, y, z, itemId, blockId, side); //and this line to the top of useItem
}
