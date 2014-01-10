//Requires at least BlockLauncher 1.6.4 beta 5 (since before then Level.dropItem did not return the entity)

var spawnedGolems = [];

//golem structure:
//object of {"e": list of item entities};
//every turn:
//for each spawned golem
//for each item entity
//set velocity of y to zero if standing on ground
//set other velocities as appropriate

var golemBeingConstructed = [];

var placingGolem = false;

var GOLEMNATOR = 267; //sword

function modTick() {
	for (var i = 0; i < spawnedGolems.length; i++) {
		var e = spawnedGolems[i]["e"];
		for (var j = 0; j < e.length; j++) {
			var ent = e[j]["e"]; //actual entity
			setVelY(ent, 0);
			setVelX(ent, 0.1);
			setVelZ(ent, 0);
			setPosition(ent, Entity.getX(ent), e[j]["l"][1] + 0.5, Entity.getZ(ent));
		}
	}
}

function useItem(x, y, z, itemId, blockId, side) {
	if (placingGolem) {
		if (itemId == GOLEMNATOR) { //stick
			spawnGolem();
			placingGolem = false;
			return;
		}
		if (itemId > 0xff) return;
		var coords = getPlaceAgainstCoords(x, y, z, side);
		coords[3] = itemId;
		golemBeingConstructed.push(coords);
	} else {
		if (itemId == GOLEMNATOR) { //stick
			placingGolem = true;
		}
	}
}

function spawnGolem() {
	var myEntityList = new Array(golemBeingConstructed.length);
	var myGolem = {"e": myEntityList};
	for (var i = 0; i < golemBeingConstructed.length; i++) {
		var coords = golemBeingConstructed[i];
		setTile(coords[0], coords[1], coords[2], 0);
		var ent = Level.dropItem(coords[0] + 0.5, coords[1] + 0.5, coords[2] + 0.5, 0, 1, coords[3], 0);
		Entity.setRenderType(ent, 20);
		Entity.setVelX(ent, 0);
		Entity.setVelY(ent, 0);
		Entity.setVelZ(ent, 0);
		myEntityList[i] = {"e": ent, "l": coords};
	}
	spawnedGolems.push(myGolem);
	golemBeingConstructed = [];
}

var directions = [
	[0, -1, 0],
	[0, 1, 0],
	[0, 0, -1],
	[0, 0, 1],
	[-1, 0, 0],
	[1, 0, 0]
]; //See Minecraft Pi api in EventFactory

function getPlaceAgainstCoords(x, y, z, side) {
	var dir = directions[side];
	return [x + dir[0], y + dir[1], z + dir[2]];
}

