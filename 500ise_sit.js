var cart = -1;
var playerX;
var playerZ;
var stairBlocks = [53, 67, 108, 109, 114, 128, 134, 135, 136, 156];
function useItem(x, y, z, itemid, blockId, side) {
	if (stairBlocks.indexOf(blockId) >= 0) {
		//spawn a minecart
		cart = Level.spawnMob(x + 0.5, y + 1, z + 0.5, 84, "mob/char.png");
		//make it invisible
		Entity.setRenderType(cart, 0);
		rideAnimal(getPlayerEnt(), cart);
		preventDefault();
		//store the chair's location: that way, when the player gets off, we can remove the cart
		playerX = x + 0.5;
		playerZ = z + 0.5;
	}
}

function modTick() {
	if (cart == -1) return;
	if (Math.abs(getPlayerX() - playerX) > 1 || Math.abs(getPlayerZ() - playerZ) > 1) {
		Entity.remove(cart);
		cart = -1;
	}
}
