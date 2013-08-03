var WAITING_FOR_FIRST_POS = 0;
var WAITING_FOR_SECOND_POS = 1;
var WAITING_FOR_REPLACE_MATERIAL = 2;
var WAITING_FOR_MATERIAL = 3;

var selectionStage = WAITING_FOR_FIRST_POS;

var firstPoint = [0, 0, 0];
var secondPoint = [0, 0, 0];

function useItem(x, y, z, itemId, blockId) {
	if (selectionStage == WAITING_FOR_MATERIAL) {
		//itemId is the material we want
		var material = itemId > 0xff? 0 : itemId;
		createCuboid(firstPoint, secondPoint, replaceMaterial, material);
		selectionStage = WAITING_FOR_FIRST_POS;
		preventDefault();
	} else if (selectionStage == WAITING_FOR_REPLACE_MATERIAL) {
		replaceMaterial = itemId > 0xff? blockId: itemId;
		selectionStage = WAITING_FOR_MATERIAL;
		print("Replace block set to " + replaceMaterial);
		preventDefault();
	} else {
		if (itemId == 292) { //iron hoe
			var newpoint = [x, y, z];
			if (selectionStage == WAITING_FOR_FIRST_POS) {
				firstPoint = newpoint;
				print("First point set to " + newpoint.join(","));
			} else {
				secondPoint = newpoint;
				print("Second point set to " + newpoint.join(","));
			}
			selectionStage++;
			preventDefault();
		}
	}

}

function createCuboid(firstPoint, secondPoint, replaceMaterial, material) {
	var minX = Math.min(firstPoint[0], secondPoint[0]);
	var minY = Math.min(firstPoint[1], secondPoint[1]);
	var minZ = Math.min(firstPoint[2], secondPoint[2]);

	var maxX = Math.max(firstPoint[0], secondPoint[0]);
	var maxY = Math.max(firstPoint[1], secondPoint[1]);
	var maxZ = Math.max(firstPoint[2], secondPoint[2]);

	for (var x = minX; x <= maxX; ++x) {
		for (var z = minZ; z <= maxZ; ++z) {
			for (var y = minY; y <= maxY; ++y) {
				if (getTile(x, y, z) == replaceMaterial) {
					setTile(x, y, z, material);
				}
			}
		}
	}
}

