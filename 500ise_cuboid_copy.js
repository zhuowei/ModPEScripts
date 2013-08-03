var WAITING_FOR_FIRST_POS = 0;
var WAITING_FOR_SECOND_POS = 1;
var WAITING_FOR_MATERIAL = 2;

var selectionStage = WAITING_FOR_FIRST_POS;

var firstPoint = [0, 0, 0];
var secondPoint = [0, 0, 0];
var clipboard;

function useItem(x, y, z, itemId, blockId) {
	if (itemId == 292) { //iron hoe
		var newpoint = [x, y, z];
		switch (selectionStage) {
			case WAITING_FOR_FIRST_POS:
				firstPoint = newpoint;
				print("First point set to " + newpoint.join(","));
				break;
			case WAITING_FOR_SECOND_POS:
				secondPoint = newpoint;
				copyCuboid(firstPoint, secondPoint);
				print("Copied, use seeds to paste");
				break;
		}
		selectionStage = (selectionStage + 1) % 2;
		preventDefault();
	} else if (itemId == 295) {
		if (clipboard != null) {
			var newpoint = [x, y, z];
			pasteCuboid(newpoint);
		}
		preventDefault();
	}

}

function copyCuboid(firstPoint, secondPoint) {
	var minX = Math.min(firstPoint[0], secondPoint[0]);
	var minY = Math.min(firstPoint[1], secondPoint[1]);
	var minZ = Math.min(firstPoint[2], secondPoint[2]);

	var maxX = Math.max(firstPoint[0], secondPoint[0]);
	var maxY = Math.max(firstPoint[1], secondPoint[1]);
	var maxZ = Math.max(firstPoint[2], secondPoint[2]);

	var widthX = (maxX - minX) + 1;
	var widthY = (maxY - minY) + 1;
	var widthZ = (maxZ - minZ) + 1;
	clipboard = new Array(widthX);

	for (var x = 0; x < widthX; ++x) {
		clipboard[x] = new Array(widthY);
		for (var y = 0; y < widthY; ++y) {
			clipboard[x][y] = new Array(widthZ);
			for (var z = 0; z < widthZ; ++z) {
				clipboard[x][y][z] = getTile(minX + x, minY + y, minZ + z);
			}
		}
	}
}

function pasteCuboid(point) {
	for (var x = 0; x < clipboard.length; ++x) {
		for (var y = 0; y < clipboard[0].length; ++y) {
			for (var z = 0; z < clipboard[0][0].length; ++z) {
				setTile(point[0] + x, point[1] + y, point[2] + z, clipboard[x][y][z]);
			}
		}
	}
}
