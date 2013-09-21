var vehicleMaxSize = 10, vehicleSpeed = 5; // blocks wide search area and speed - move every 10 ticks
var vehicleBlocks = null;
var disallowedIds = [1, 2, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 24, 31, 37, 38];
var vehicleLoc = null, vehicleVel = [0, 1, 0];
var directions = [[0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0]];
function useItem(x, y, z, itemId, blockId, side) {
	if (itemId != 292) {
		vehicleLoc = vehicleBlocks = null;
		return;
	}
	preventDefault();
	if (vehicleLoc != null) {
		vehicleVel = directions[side];
		return;
	}
	vehicleBlocks = new Array(vehicleMaxSize);
	for (var xx = 0; xx < vehicleMaxSize; xx++) {
		vehicleBlocks[xx] = new Array(vehicleMaxSize);
		for (var yy = 0; yy < vehicleMaxSize; yy++) {
			vehicleBlocks[xx][yy] = new Array(vehicleMaxSize);
			for (var zz = 0; zz < vehicleMaxSize; zz++) {
				var blockId = getTile(x + xx - (vehicleMaxSize / 2), 
					y + yy - (vehicleMaxSize / 2), z + zz - (vehicleMaxSize / 2));
				vehicleBlocks[xx][yy][zz] = (disallowedIds.indexOf(blockId) >= 0) ? 0: blockId;
			}
		}
	}
	vehicleLoc = [x - (vehicleMaxSize / 2), y - (vehicleMaxSize / 2), z - (vehicleMaxSize / 2)];
}
function modTick() {
	if (vehicleLoc == null || --vehicleSpeed > 0) return;
	vehicleSpeed = 5;
	for (var x = 0; x < vehicleMaxSize; ++x)
		for (var y = 0; y < vehicleMaxSize; ++y)
			for (var z = 0; z < vehicleMaxSize; ++z)
				if (vehicleBlocks[x][y][z] != 0)
					setTile(vehicleLoc[0] + x, vehicleLoc[1] + y, vehicleLoc[2] + z, 0);
	vehicleLoc[0] += vehicleVel[0];
	vehicleLoc[1] += vehicleVel[1];
	vehicleLoc[2] += vehicleVel[2];
	for (var x = 0; x < vehicleMaxSize; x++)
		for (var y = 0; y < vehicleMaxSize; y++)
			for (var z = 0; z < vehicleMaxSize; z++)
				if (vehicleBlocks[x][y][z] != 0)
					setTile(vehicleLoc[0] + x, vehicleLoc[1] + y, vehicleLoc[2] + z, vehicleBlocks[x][y][z]);
	setPositionRelative(getPlayerEnt(), vehicleVel[0], vehicleVel[1], vehicleVel[2]);
}
function newLevel() {
	vehicleLoc = vehicleBlocks = null;
}
