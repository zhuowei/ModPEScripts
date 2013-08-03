var mirrorPoint = null;

var directions = [
	[0, -1, 0],
	[0, 1, 0],
	[0, 0, -1],
	[0, 0, 1],
	[-1, 0, 0],
	[1, 0, 0]
]; //See Minecraft Pi api in EventFactory

function useItem(x, y, z, itemId, blockId, side) {
	if (itemId == 362) { //melon seeds
		if (mirrorPoint == null) {
			mirrorPoint = getPlaceAgainstCoords(x, y, z, side);
			print("Mirroring around coordinates: " + x + ":" + y + ":" + z);
		} else {
			mirrorPoint = null;
			print("Mirroring is off");
		}
		preventDefault();
	} else if (mirrorPoint != null && itemId > 0 && itemId < 0xff) { //block placing with mirror point
		var finalPoint = getPlaceAgainstCoords(x, y, z, side);
		var xx = finalPoint[0];
		var yy = finalPoint[1];
		var zz = finalPoint[2];
		var deltaX = xx - mirrorPoint[0];
		var deltaZ = zz - mirrorPoint[2];
		//4 mirror blocks: ++, -+, +-, --
		preventDefault();
		setTile(mirrorPoint[0] + deltaX, yy, mirrorPoint[2] + deltaZ, itemId);
		setTile(mirrorPoint[0] - deltaX, yy, mirrorPoint[2] + deltaZ, itemId);
		setTile(mirrorPoint[0] + deltaX, yy, mirrorPoint[2] - deltaZ, itemId);
		setTile(mirrorPoint[0] - deltaX, yy, mirrorPoint[2] - deltaZ, itemId);
	}
}

function getPlaceAgainstCoords(x, y, z, side) {
	var dir = directions[side];
	return [x + dir[0], y + dir[1], z + dir[2]];
}

