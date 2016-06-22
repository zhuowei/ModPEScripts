//Super pickaxe: tap on a block with a Iron hoe to mine a 11x11x11 square around/above it

function useItem(x, y, z, itemId, blockId) {
	if (itemId != 278) return; //if not iron hoe exit the method
	for (var xx = x - 5; xx <= x + 5; xx++) {
		for (var zz = z - 5; zz <= z + 5; zz++) {
			for (var yy = y; yy < y + 11; yy++) {
				var tile = getTile(xx, yy, zz);
				if (tile != 0) {
					setTile(xx, yy, zz, 0);
					if (tile != 1 && tile != 2 && tile != 3) { //not stone, grass, dirt
						addItemInventory(tile, 1);
					}
				}
			}
		}
	}
	preventDefault();
}
