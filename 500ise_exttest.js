var mySneak = false;
function procCmd(cmd) {
	if (cmd == "t") {
		firstTest();
	} else if (cmd == "l") {
		ModPE.selectLevel("ASDF-");
	} else if (cmd == "s") {
		mySneak = !mySneak;
		Entity.setSneaking(getPlayerEnt(), mySneak);
		ModPE.setGameSpeed(mySneak? 40: 20);
	}
}

function useItem(x, y, z, itemId, blockId, side) {
	if (blockId == 63 || blockId == 68) {//sign
		for (var i = 0; i < 4; i++) {
			clientMessage(Level.getSignText(x, y, z, i));
			var newText = Math.floor(Math.random() * 1000).toString();
			Level.setSignText(x, y, z, i, newText);
			if (newText != Level.getSignText(x, y, z, i)) {
				print("Sign text fail");
			}
		}
		preventDefault();
	} else if (blockId == 54) {//chest
		for (var i = 0; i < 27; i++) {
			var myInitItem = Level.getChestSlot(x, y, z, i);
			// x, y, z, slot, id, damage, count
			Level.setChestSlot(x, y, z, i, 35, i & 0xf, i);
			var finalId = Level.getChestSlot(x, y, z, i);
			var finalCount = Level.getChestSlotCount(x, y, z, i);
			var finalData = Level.getChestSlotData(x, y, z, i);
			if (finalId != 35 || finalCount != i || finalData != i % 16) {
				print("Chest fail: " + finalId + ":" + finalCount + ":" + finalData);
			}
		}
	}
}

function destroyBlock(x, y, z, side) {
	print("Destroyed block at " + x + ":" + y + ":" + z);
}

function newLevel() {
	print(Level.getWorldDir());
	print(Level.getWorldName());
	if (Level.getWorldDir() == "Nyantest") {
		secondTest();
	}
}

function firstTest() {
	Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "mob.zombiedie", 1, 1);
	var zombie = Level.spawnMob(getPlayerX(), getPlayerY(), getPlayerZ(), 32, "mob/char.png");
	if (Entity.getEntityTypeId(zombie) != 32) {
		print("Entity type id fail");
	}
	if (Entity.getHealth(zombie) != 12) {
		print("Zombie health fail: " + Entity.getHealth(zombie));
	}
	Entity.remove(zombie);
	Player.setArmorSlot(0, 35, 2);
	if (Player.getArmorSlot(0) != 35) {
		print("Armor slot fail");
	}
	if (Player.getArmorSlotDamage(0) != 2) {
		print("Armor slot damage fail: " + Player.getArmorSlot(0, DAMAGE));
	}

	var currentSlotId = Player.getSelectedSlotId();
	if (getCarriedItem() != Player.getInventorySlot(currentSlotId)) {
		print("Carried item fail: slot " + currentSlotId + ":" + getCarriedItem() + ":" + Player.getInventorySlot(currentSlotId));
	}
	var zombie2 = Level.spawnMob(getPlayerX(), getPlayerY(), getPlayerZ(), 32, "mob/char.png");
	Entity.setRenderType(zombie2, 12);
	Entity.setFireTicks(getPlayerEnt(), 1000);
}

function secondTest() {
}
