function procCmd(cmd) {
	cmd = cmd.split(" ");
	if (cmd[0] != "give" && cmd[0] != "hold") return;
	// takes the name the user input, and returns the matching item ID
	// Item.translatedNameToId depends on your language e.g. hacha_de_oro returns the ID for gold axe if you're using Spanish
	// Item.internalNameToId uses the internal name as seen in assets/loc/*.lang files e.g. hatchetgold returns ID for gold axe
	var id = Item.translatedNameToId(cmd[1]);
	var count = 1;
	var damage = 0;
	if (cmd.length >= 3) {
		count = parseInt(cmd[2]);
	}
	if (cmd.length >= 4) {
		damage = parseInt(cmd[3]);
	}
	if (cmd[0] == "give") {
		addItemInventory(id, count, damage);
	} else if (cmd[0] == "hold") {
		print(cmd[0]);
		//Player.setInventorySlot(Player.getSelectedSlotId(), id, count, damage);
		Entity.setCarriedItem(getPlayerEnt(), id, count, damage);
	}
}
