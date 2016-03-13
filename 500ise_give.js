function procCmd(cmd) {
	cmd = cmd.split(" ");
	if (cmd[0] != "give" && cmd[0] != "hold") return;
	var id = Item.nameToId(cmd[1]);
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
