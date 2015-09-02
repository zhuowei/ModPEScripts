var mySneak = false;
var entityListenerActivated = false;
var lastPointedEntity = -1;
var lastPointedBlock = -1;

Item.addCraftRecipe(256, 1, 0, [1, 1, 0]); //gives iron tools from stone ;)
Item.addFurnaceRecipe(3, 257, 0); //gives iron pickaxe from dirt ;)

function procCmd(cmd) {
	var parts = cmd.split(" ");
	if (cmd == "t") {
		firstTest();
	} else if (cmd == "l") {
		ModPE.selectLevel("ASDF-");
	} else if (cmd == "s") {
		mySneak = !mySneak;
		Entity.setSneaking(getPlayerEnt(), mySneak);
		ModPE.setGameSpeed(mySneak? 40: 20);
	} else if (cmd == "el") {
		entityListenerActivated = !entityListenerActivated;
	} else if (cmd == "cow") {
		var cow = spawnCow(getPlayerX(), getPlayerY() + 1, getPlayerZ());
		Entity.setNameTag(cow, "Sparkle");
		clientMessage(Entity.getUniqueId(cow));
	} else if (cmd == "chatmsg") {
		for (var i = 0; i < 16; i++) {
			ModPE.sendChat("Hi! I'm a clientside ModPE script, saying " + i);
		}
	} else if (cmd == "removeent") {
		var allEnt = Entity.getAll();
		for (var i = 0; i < allEnt.length; i++) {
			if (allEnt[i] == getPlayerEnt()) continue;
			Entity.remove(allEnt[i]);
		}
		clientMessage("Removed " + allEnt.length + " entities");
	} else if (parts[0] == "render") {
		Entity.setRenderType(getPlayerEnt(), parts[1]);
	} else if (parts[0] == "drop") {
		var drop = Level.dropItem(getPlayerX(), getPlayerY(), getPlayerZ() + 5, 0.0, 46, 12, 17);
		var dropId = Entity.getItemEntityId(drop);
		var dropData = Entity.getItemEntityData(drop);
		var dropCount = Entity.getItemEntityCount(drop);
		if (dropId != 46 || dropCount != 12 || dropData != 17) {
			clientMessage("Drop fail: expected 46 12 17 got " + dropId + ":" + dropCount + ":" + dropData);
		}
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
	ModPE.showTipMessage("Destroyed block at " + x + ":" + y + ":" + z);
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
	if (Entity.getHealth(zombie) != 20) {
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
	Entity.setNameTag(zombie2, "Herobrine");
	if (Entity.getNameTag(zombie2) != "Herobrine") {
		print("Name tag fail");
	}
	ModPE.langEdit("options.group.realms", "Cloudify");
	Level.setTime(1234);
	if (Level.getTime() != 1234) {
		print("Level.getTime fail: " + Level.getTime());
	}
	Entity.setSneaking(getPlayerEnt(), true);
	if (Entity.isSneaking(getPlayerEnt()) != true) {
		print("Entity sneaking fail");
	}
	Entity.setSneaking(getPlayerEnt(), false);
	var gameMode = Level.getGameMode();
	var newMode = gameMode == 1? 0: 1;
	Level.setGameMode(newMode);
	if (newMode != Level.getGameMode()) {
		print("Gamemode fail");
	}
	Level.setGameMode(gameMode);

	var drop = Level.dropItem(getPlayerX(), getPlayerY(), getPlayerZ() + 5, 0.0, 46, 12, 17);
	var dropId = Entity.getItemEntityId(drop);
	var dropData = Entity.getItemEntityData(drop);
	var dropCount = Entity.getItemEntityCount(drop);
	if (dropId != 46 || dropCount != 12 || dropData != 17) {
		clientMessage("Drop fail: expected 46 12 17 got " + dropId + ":" + dropCount + ":" + dropData);
	}
}

function secondTest() {
}
var cameraEntity = -1;
function entityAddedHook(entity) {
	if (entityListenerActivated) {
		clientMessage("added entity " + Entity.getEntityTypeId(entity));
	}
}

function entityRemovedHook(entity) {
	if (entityListenerActivated) {
		clientMessage("removed entity " + Entity.getEntityTypeId(entity));
	}
}

function startDestroyBlock(x, y, z, side) {
	clientMessage("Start destroy block: " + x + ":" + y + ":" + z + ":" + side);
}

function attackHook(attacker, victim) {
	clientMessage(victim + ":" + Entity.getUniqueId(victim));
}

function modTick() {
	var pointedEntity = Player.getPointedEntity();
	if (pointedEntity != lastPointedEntity) {
		lastPointedEntity = pointedEntity;
		clientMessage("New pointed entity: " + pointedEntity + (pointedEntity != -1?
			" type: " + Entity.getEntityTypeId(pointedEntity) : " no entity"));
	}
	var pointedBlock = Player.getPointedBlockId();
	if (pointedBlock != lastPointedBlock) {
		lastPointedBlock = pointedBlock;
		if (pointedBlock != -1) clientMessage("New pointed block: " + pointedBlock);
	}
}
