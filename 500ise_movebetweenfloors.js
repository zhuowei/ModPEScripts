var UPWARD = 1;
var DOWNWARD = -1;

function useItem(x, y, z, itemId, blockId) {
	if (itemId == 354) {//cake
		teleportToFloor(UPWARD);
		preventDefault();
	} else if (itemId == 344) {//egg
		teleportToFloor(DOWNWARD);
		preventDefault();
	}
}

function teleportToFloor(direction) {
	var currentX = Math.floor(getPlayerX());
	var currentZ = Math.floor(getPlayerZ());
	var currentY = Math.floor(getPlayerY() - 1.6); //get player's feet, so subtract 1.6 (player's height)
	var beginY = currentY + (direction * 2);
	for (var i = beginY; i < 128 && i >= 0; i+=direction) {
		if (getTile(currentX, i, currentZ) != 0 && getTile(currentX, i + 1, currentZ) == 0 && getTile(currentX, i + 2, currentZ) == 0) {
			var deltaY = (i - currentY);
			setPosition(getPlayerEnt(), currentX, getPlayerY() + deltaY + 1, currentZ);
			break;
		}
	}
}
