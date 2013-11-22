//quick test to show off the colouring features of the custom blocks API
//released under CC0: do whatever you want with this
var initialized = false;
var EVIL_ORE_ID = 187;

function selectLevelHook() { //This is called before the first world is loaded
	if (!initialized) { //if we have not set up our custom block
		Block.defineBlock(EVIL_ORE_ID, "Ore of evil", [[3, 2]]);
		Block.setDestroyTime(EVIL_ORE_ID, 2);
		Block.setColor(EVIL_ORE_ID, [0xff00ff]);
		Block.setLightLevel(EVIL_ORE_ID, 15);
		initialized = true;
	}
}


function destroyBlock(x, y, z, side) {
	var blockId = getTile(x, y, z);
	if (blockId == EVIL_ORE_ID) {
		preventDefault();
		setTile(x, y, z, 0);
		Level.dropItem(x + 0.5, y, z + 0.5, 1, 351, 1, 5); //purple dye
	}
}
