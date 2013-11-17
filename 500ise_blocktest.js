//initialize
var initialized = false;
var RENDER_LADDER = 8;
var RENDER_NORMAL = 0;
var VINE_ID = 187;
function selectLevelHook() {
	if (!initialized) {
		//TEMP API: Will change
		//params:
		//block ID, name, texture array (either a single integer array, or a multiple of 6)
		//material block ID (to copy material from; e.g stone material = 1
		//is opaque
		//render type
		//e.g. the following call defines a block with ID 187,
		//block name "Vine", 
		//texture of 5,4,3,2,1,0 for all damage values
		//using material from dirt (NOT WORKING YET)
		//not opaque (i.e. transparent to light) (NOT WORKING YET)
		//render type of 10 (NOT WORKING YET)
		Block.defineBlock(VINE_ID, "Evil dirt", [5, 4, 3, 2, 1, 0], 2, false, 10);
		Block.setLightLevel(VINE_ID, 15);
		Block.setDestroyTime(VINE_ID, 1);
		initialized = true;
		print("Init");
	}
}

function useItem(x, y, z, itemId, blockId, side) {
	//preventDefault();
	//setTile(x, y, z, 187);
	addItemInventory(187, 1);
}
