/* Dyed clay script: tap clay with dye to colour it.
This script is licensed under CC0: do whatever you want with it.
*/
var BLOCK_STAINED_CLAY = 159;
var initialized = false;

var colour = [0xffffff, 0xff8000, 0xff80ff, 0x4040ff, 0xffff00, 0x00ff00, 0xff0080, 0x404040,
	      0xc4c4c4, 0x0080c8, 0x800080, 0x000080, 0x804000, 0x008000, 0x800000, 0x000000];


function selectLevelHook() {
	if (initialized) return;
	//id 159 (same as desktop), name, texture, source material
	Block.defineBlock(BLOCK_STAINED_CLAY, "Stained Clay", 72);
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
