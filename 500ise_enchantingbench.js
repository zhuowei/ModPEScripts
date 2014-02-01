//example enchantment bench script by 500 Internal Server Error
//uses block ID 187
//use give commands to give yourself block 187; when tapped, it opens the crafting menu
//this script is licensed under CC0: you may do whatever you want with it.
var initialized = false;
var ENCHANTMENT_TABLE_ID = 187;

var currentWorkbenchX, currentWorkbenchY, currentWorkbenchZ;
var needToSwitchBack = false;

function selectLevelHook() { //This is called before the first world is loaded
	if (!initialized) { //if we have not set up our custom block
		// define a block with ID 187, name "Enchantment table", and the following textures
		// in the order (bottom, top, south, north, west, east).
		// in this case, the side textures are the same, and the top/bottom textures are different.
		Block.defineBlock(ENCHANTMENT_TABLE_ID, "Enchantment table", 
			[["enchanting_table_bottom", 0], ["enchanting_table_top", 0],
			["enchanting_table_side", 0], ["enchanting_table_side", 0],
			["enchanting_table_side", 0], ["enchanting_table_side", 0]]);
		// sets the block's boundaries.
		// the order of parameters: xmin, ymin, zmin, xmax, ymax, zmax
		// in this case, the block starts at y = 0, and stops at y = 0.75 - this is a block 3/4 m high.
		Block.setShape(ENCHANTMENT_TABLE_ID, 0, 0, 0, 1, 3/4, 1);
		Block.setDestroyTime(ENCHANTMENT_TABLE_ID, 1);
		initialized = true;
	}
}

function useItem(x, y, z, itemId, blockId, side) {
	if (blockId == ENCHANTMENT_TABLE_ID) {
		currentWorkbenchX = x;
		currentWorkbenchY = y;
		currentWorkbenchZ = z;
		setTile(x, y, z, 58); //set to workbench so Minecraft PE would open the crafting menu
		needToSwitchBack = true;
	}	
}

function procCmd(cmd) {
	if (cmd == "enchanttable") {
		addItemInventory(ENCHANTMENT_TABLE_ID, 1);
	}
}

function modTick() {
	if (needToSwitchBack) {
		needToSwitchBack = false;
		setTile(currentWorkbenchX, currentWorkbenchY, currentWorkbenchZ, ENCHANTMENT_TABLE_ID);
		//switch it back to the original
	}
}
