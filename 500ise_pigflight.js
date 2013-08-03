var riddenAnimal = null;
var ANIMAL_SPEED = 0.5;
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

function bl_tickHook() {
	if (riddenAnimal == null) return;
	//todo: check if player is still mounted so we don't overwrite memory for lolz
	var itemInHand = getCarriedItem();
	if (itemInHand == 16) { //coal ore
		setVelY(riddenAnimal, 0.5);
	} else if (itemInHand == 15) { //iron ore
		//down
		//do nothing, gravity will take care of it
	} else {
		setVelY(riddenAnimal, 0);
	}
	
	if (itemInHand == 14) {//gold ore
		setVelX(riddenAnimal, ANIMAL_SPEED);
	} else if (itemInHand == 56) { //diamond ore
		setVelX(riddenAnimal, -1 * ANIMAL_SPEED);
	} else {
		setVelX(riddenAnimal, 0);
	}

	if (itemInHand == 21) {//lapis
		setVelZ(riddenAnimal, ANIMAL_SPEED);
	} else if (itemInHand == 73) {//redstone ore
		setVelZ(riddenAnimal, -1 * ANIMAL_SPEED);
	} else {
		setVelZ(riddenAnimal, 0);
	}
}
