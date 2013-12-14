//Treebl's item demo script, slightly cleaned up
var tb = false;

function useItem(x, y, z, itemId, blockId, side) {
	if (itemId == 280 && !tb) { //if the item is a stick and items hasn't been initialized
		ModPE.setItem(392, "stick", 0, "Wand");
		ModPE.setFoodItem(393, "cookie", 0, 5, "Cookie");
		Player.addItemInventory(392, 5);
		Player.addItemInventory(393, 1);
		tb = true;
	} else if (itemId == 280) { //else: if the item is a stick
		Player.addItemInventory(392, 5);
		Player.addItemInventory(393, 1);
	} else if (itemId == 392) { //else: if the item is a wand
		Level.spawnChicken(x, y + 1, z, "mob/chicken.png");
	}
}
