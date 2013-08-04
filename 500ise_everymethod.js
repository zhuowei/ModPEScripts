//This is a useless script that calls every ModPE api as of version 0.2.
//it's mainly for use as a unit test script.

var playerHeight = 1.6;

function useItem(x, y, z, itemId, blockId) {
	print("Every method script starting");

	if (blockId != getTile(x, y, z)) {
		print("BlockId fail");
	}

	var playerX = getPlayerX();
	var playerY = getPlayerY();
	var playerZ = getPlayerZ();
	var player = getPlayerEnt();
	var level = getLevel();
	setPosition(player, 111, 122, 133);
	playerX = getPlayerX();
	playerY = getPlayerY();
	playerZ = getPlayerZ();

	if (abs(playerX - 111) > 0.1 || abs(playerY - 122) > playerHeight + 0.1 || abs(playerZ - 133) > 0.1) {
		//todo: clarify. is getPlayerY player head coord or player feet coord?
		print("Player position fail: " + playerX + ":" + playerY + ":" + playerZ);
	}

	setVelX(player, 1);
	setVelY(player, 1);
	setVelZ(player, 1);
	explode(x, y, z, 4.0);
	addItemInventory(46, 12);
	//ride animal is tested on the next segment
	var carried = getCarriedItem();

	if (carried != itemId) {
		print("Item ID fail");
	}

	preventDefault();
	setTile(x, y, z, 46);
	spawnChicken(x, y, z, "mob/chicken.png");
	spawnCow(x, y, z, "mob/cow.png");
	clientMessage("Calling client message");
	setNightMode(true);
	var tileBegotten = getTile(x, y, z);

	if (tileBegotten != 46) {
		print("Tile fail");
	}

	setPositionRelative(player, 1, 2, 3);

	if (abs((getPlayerX() - playerX) - 1) > 0.1 || abs((getPlayerY() - playerY) - 2) > 0.1 || abs((getPlayerZ() - playerZ) - 3) > 0.1) {
		print("Player relative position fail: " + getPlayerX() + ":" + getPlayerY() + ":" + getPlayerZ());
	}

	setRot(player, 123, 45);
}

function attackHook(player, entity) {
	rideAnimal(player, entity);
}

function abs(number) {
	//helper method since the iOS version doesn't have a Math object
	if (number >= 0) return number;
	return -1 * number;
}
