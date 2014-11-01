var colour = [0xffffff, 0xff8000, 0xff80ff, 0x4040ff, 0xffff00, 0x00ff00, 0xff0080, 0x404040,
	      0xc4c4c4, 0x0080c8, 0x800080, 0x000080, 0x804000, 0x008000, 0x800000, 0x000000];

function useItem(x, y, z, itemId, blockId, side, itemData, blockData) {
	if (blockId != 2) return; //not grass lol
	Level.setGrassColor(x, z, colour[15 - itemData]);
}
