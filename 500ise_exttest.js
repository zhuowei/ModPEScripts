"use strict";
var mySneak = false;
var entityListenerActivated = false;
var lastPointedEntity = -1;
var lastPointedBlock = -1;
var cowfly = -1;

Item.addCraftRecipe(256, 1, 0, [1, 1, 0]); //gives iron tools from stone ;)
Item.addCraftRecipe(258, 1, 0, [256, 1, 0]); //gives iron tools from stone ;)
Item.addFurnaceRecipe(3, 257, 0); //gives iron pickaxe from dirt ;)
Item.addShapedRecipe(257, 1, 0, [" r ", " s ", "   ",], ["r", 256, 0, "s", 3, 0]);

ModPE.setFoodItem(4003, "record_cat", 0, 5, "Swagger extension");
Item.addFurnaceRecipe(1, 76, 0); //gives redstone torch from dirt
Item.addFurnaceRecipe(4003, 2, 0); // gives grass from swagger extension

Item.defineArmor(4011, "empty_armor_slot_boots", 0, "Zombie mask",
			"mob/zombie.png", 1, 10, ArmorType.helmet);
Item.defineArmor(4012, "empty_armor_slot_chestplate", 0, "Zombie shirt",
			"mob/zombie.png", 1, 10, ArmorType.chestplate);
Item.defineArmor(4013, "empty_armor_slot_leggings", 0, "Zombie pants",
			"mob/zombie.png", 1, 10, ArmorType.leggings);
Item.defineArmor(4014, "empty_armor_slot_boots", 0, "Zombie shoes",
			"mob/zombie.png", 1, 10, ArmorType.boots);
Item.setCategory(4011, ItemCategory.MATERIAL);
Player.addItemCreativeInv(4011, 1, 0);
Item.setCategory(4012, ItemCategory.DECORATION);
Player.addItemCreativeInv(4012, 1, 0);
Item.setCategory(4013, ItemCategory.TOOL);
Player.addItemCreativeInv(4013, 1, 0);
Item.setCategory(4014, ItemCategory.FOOD);
Player.addItemCreativeInv(4014, 1, 0);

var shoesNutrition = 4;

// make the shoes edible
// anything that can be specified in items.json can be specified here
Item.setProperties(4014, {
    "use_animation": "eat",
    "use_duration": 32,

    "food": {
      "nutrition": shoesNutrition,
      "saturation_modifier": "low",
      "is_meat": false
    }
});

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
		ModPE.setCamera(cow);
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
	} else if (parts[0] == "prep") {
		addItemInventory(1, 64);
		addItemInventory(pistonId, 64);
		addItemInventory(3, 64);
		addItemInventory(263, 64); // coal
		addItemInventory(4011, 1);
		addItemInventory(4012, 1);
		addItemInventory(4013, 1);
		addItemInventory(4014, 1);
		Entity.setHealth(getPlayerEnt(), 20);
		Level.setTime(0);
	} else if (parts[0] == "cowfly") {
		cowfly = spawnCow(getPlayerX(), getPlayerY(), getPlayerZ());
		Entity.setMaxHealth(cowfly, 9999);
		Entity.setHealth(cowfly, 9999);
		Entity.setNameTag(cowfly, "Cowfly");
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
		if (Block.isDouble) clientMessage("chest: is double = " + Block.isDouble(x, y, z) + "x: " + Block.getSecondPartX(x, y, z) +
			"y:" + Block.getSecondPartY(x, y, z) + "z:" + Block.getSecondPartZ(x, y, z));
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
	} else if (blockId == 50) {
		clientMessage("Playing sound");
		Level.playSound(x, y+1, z, "random.click");
	} else if (itemId == 272) {
		var thunderBolt = Level.spawnMob(x, y, z, EntityType.LIGHTNING_BOLT);
		clientMessage("Spawning bolt: " + thunderBolt);
		if (Entity.getEntityTypeId(thunderBolt) != EntityType.LIGHTNING_BOLT) {
			print("Lightning fail type");
		}
	} else if (blockId == 52) {
		Level.setSpawnerEntityType(x, y, z, EntityType.GHAST);
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
		print("Entity type id fail " + Entity.getEntityTypeId(zombie));
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
	var player = getPlayerEnt();
	var playerX = getPlayerX();
	var playerY = getPlayerY();
	var playerZ = getPlayerZ();

	var drop = Level.dropItem(playerX, playerY, playerZ + 5, 0.0, 46, 12, 17);
	var dropId = Entity.getItemEntityId(drop);
	var dropData = Entity.getItemEntityData(drop);
	var dropCount = Entity.getItemEntityCount(drop);
	if (dropId != 46 || dropCount != 12 || dropData != 17) {
		clientMessage("Drop fail: expected 46 12 17 got " + dropId + ":" + dropCount + ":" + dropData);
	}

	Level.addParticle(ParticleType.heart, playerX, playerY, playerZ, 0, 0, 0, 1);

	Entity.addEffect(player, MobEffect.nightVision, 20*30, 0, false, true);
	Entity.removeEffect(player, MobEffect.nightVision);
	Entity.removeAllEffects(player);
	setTile(playerX, playerY, playerZ, 76);
	var superCow = spawnCow(playerX, playerY, playerZ);
	Entity.setNameTag(superCow, "super cow");
	Entity.setMaxHealth(superCow, 5000);
	Entity.setHealth(superCow, 5000);
	if (Entity.getHealth(superCow) != 5000) {
		print("Cow fail: " + Entity.getHealth(superCow));
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
	clientMessage(victim + ":" + Entity.getHealth(victim));
	if (Entity.getEntityTypeId(victim) == EntityType.PIG_ZOMBIE) {
		Entity.setCarriedItem(victim, 256, 1);
		clientMessage("Set carried");
	}
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
	//clientMessage(Player.getPointedVecX() + ":" + Player.getPointedVecY() + ":" + Player.getPointedVecZ());
	if (cowfly != -1) {
		Entity.setPosition(cowfly, Player.getPointedVecX(), Player.getPointedVecY() + 2, Player.getPointedVecZ());
		Entity.setVelX(cowfly, 0);
		Entity.setVelY(cowfly, 0);
		Entity.setVelZ(cowfly, 0);
	}
}

function eatHook(h, saturationRatio) {
	clientMessage("eat health: " + h + ":" + saturationRatio);
}
