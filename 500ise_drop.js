//clone of Nerim's script
var dropped = false;

var directions = [
	[0, -1, 0],
	[0, 1, 0],
	[0, 0, -1],
	[0, 0, 1],
	[-1, 0, 0],
	[1, 0, 0]
]; //See Minecraft Pi api in EventFactory

function entityAddedHook(ent) {
	if (!dropped || Entity.getEntityTypeId(ent) != 64) return;
	Entity.setRenderType(ent, 20);
	Entity.setVelX(ent, 0);
	Entity.setVelY(ent, 0);
	Entity.setVelZ(ent, 0);
}

function useItem(x, y, z, itemId, blockId, side) {
	if (itemId >= 256) return;
	dropped = true;
	var dir = directions[side];

	Level.dropItem(x + dir[0] + 0.5, y + dir[1] + 0.25, z + dir[2] + 0.5, 0, 1, itemId, 0); //count is interpreted as block ID by falling block renderer

	preventDefault();
	dropped = false;
}
