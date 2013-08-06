var riddenAnimal = null;
var ANIMAL_SPEED = 0.5;
var ANIMAL_VERTICAL_SPEED = 0.5;
function attackHook(player, entity) {
	preventDefault();
	rideAnimal(player, entity);
	if (entity == riddenAnimal) {
		riddenAnimal = null;
	} else {
		riddenAnimal = entity;
	}
}

function useItem(x, y, z, itemId, blockId) {
	if (itemId == 58) {
		riddenAnimal = null;
	}
}

function modTick() {
	if (riddenAnimal == null) return;
	var playerYaw = getYaw();
	var playerPitch = getPitch();
	setRot(riddenAnimal, playerYaw, 0);
	//todo: check if player is still mounted so we don't overwrite memory for lolz
	var itemInHand = getCarriedItem();
	if (itemInHand == 14) { //coal ore
		var velX = -1 * Math.sin(playerYaw / 180 * Math.PI) * ANIMAL_SPEED;
		var velZ = Math.cos(playerYaw / 180 * Math.PI) * ANIMAL_SPEED;
		var velY = Math.sin((playerPitch - 180) / 180 * Math.PI) * ANIMAL_VERTICAL_SPEED;
		setVelX(riddenAnimal, velX);
		setVelY(riddenAnimal, velY);
		setVelZ(riddenAnimal, velZ);
	} else {
		setVelX(riddenAnimal, 0);
		setVelY(riddenAnimal, 0);
		setVelZ(riddenAnimal, 0);
	}
}

function leaveGame() {
	riddenAnimal = null; //BlockLauncher-specific hook, workaround for BlockLauncher not reloading scripts after entering world
}
