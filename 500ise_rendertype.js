var type = [0, 1, 2, 3, 4, 6, 7, 8, 10, 11, 13, 14, 18, 19, 21];
var names = 
["Standard",
"Flower",
"Torch",
"Fire",
"Fluid",
"Crops",
"Door",
"Ladder",
"Stairs",
"Fence",
"Cactus",
"Bed",
"Pane",
"Stem",
"Fence gate"];

var ptr = 0;

function selectLevelHook() {
	defineBlockAgain();
}

function defineBlockAgain() {
	Block.defineBlock(187, "Test", 4, 1, true, type[ptr]);
}

function useItem(x, y, z, itemId, blockId) {
	defineBlockAgain();
	clientMessage("Render type " + ChatColor.YELLOW + type[ptr] + ":" + ChatColor.GREEN + names[ptr]);
	ptr = (ptr + 1) % type.length;
	setTile(x, y, z, 0);
	setTile(x, y, z, 187);
}
	
