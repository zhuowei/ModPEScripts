function procCmd(cmd) {
	if (cmd != "removeall") return;
	var entitiesList = Entity.getAll();
	for (var i = 0; i < entitiesList.length; i++) {
		if (Player.isPlayer(entitiesList[i])) continue; //skip players, otherwise Minecraft glitches
		Entity.remove(entitiesList[i]);
	}
}
