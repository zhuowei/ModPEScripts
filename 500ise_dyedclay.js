/* Dyed clay script: tap clay with dye to colour it.
This script is licensed under CC0: do whatever you want with it.
*/
var BLOCK_STAINED_CLAY = 159;
var initialized = false;

var colour = [0x80ffffff, 0x80ff8000, 0x80ff80ff, 0x804040ff, 0x80ffff00, 0x8000ff00, 0x80ff0080, 0x80404040,
	      0x80c4c4c4, 0x800080c8, 0x80800080, 0x80000080, 0x80804000, 0x80008000, 0x80800000, 0x80000000];


function selectLevelHook() {
	if (initialized) return;
	//id 159 (same as desktop), name, texture, source material, opaque, render type
	Block.defineBlock(BLOCK_STAINED_CLAY, "Stained Clay", [72], 1, true, 0);
	Block.setColor(BLOCK_STAINED_CLAY, colour);
	Block.setDestroyTime(BLOCK_STAINED_CLAY, 1.25);
	Block.setExplosionResistance(BLOCK_STAINED_CLAY, 7);
}

function useItem(x, y, z, itemId, blockId, side) {
	if (itemId == 351 && (blockId == BLOCK_STAINED_CLAY || blockId == 82)) {//dyes on stained clay or regular clay
		preventDefault();
		var theData = Player.getCarriedItemData();
		var colour = 15 - theData;
		setTile(x, y, z, BLOCK_STAINED_CLAY, colour);
		addItemInventory(itemId, -1, theData);
	}
}

function destroyBlock(x, y, z, side) {
	var blockId = getTile(x, y, z);
	if (blockId == BLOCK_STAINED_CLAY) {
		var theData = Level.getData(x, y, z);
		Level.dropItem(x, y, z, 0.5, 351, 1, 15 - theData);
	}
}
