"use strict"; // catch more errors

var pistonId = 200; // change id for 0.14
var stickyPistonId = 201; // change id for 0.14

// Maximum number of blocks a piston can push.
var pistonMaxPush = 12;

// data values for piston head extending along the y, z, and x axis respectively.
var pistonFwd = [6, 7, 6 | 0x8];

// x, y, and z displacements for each direction (BlockFace.DOWN, UP, NORTH, SOUTH, WEST, EAST)
var directions = [
	[0, -1, 0],
	[0, 1, 0],
	[0, 0, -1],
	[0, 0, 1],
	[-1, 0, 0],
	[1, 0, 0]
];

// constructs the list of textures for each orientation of the piston
function pistonTex(activeFace, otherFace, insideFace) {
	var outarr = new Array(0x10 * 6);
	for (var i = 0; i < outarr.length; i++) {
		var dat = (i / 6)|0;
		var face = (i % 6);
		var facingFace = (dat & 0x8)? insideFace: activeFace;
		if (dat == 6 || dat == 7)
			outarr[i] = activeFace; // this is the extended piston
		else
			outarr[i] = face == (dat & 0x7)? facingFace: otherFace;
	}
	return outarr;
}
// the main piston block:
// data values:
// 0-5 corresponds to deactivated piston facing directions 0-5 
// 8-13 corresponds to activated piston facing directions 0-5 (i.e. direction with the top bit set)
// 6, 7, 14 corresponds to piston heads oriented on the y, z, and x axis.

Block.defineBlock(pistonId,"Crappiston",
	pistonTex(["piston_top_normal",0],["furnace",3],["piston_inner",0]),
	1 /* stone */,false /* not opaque */);

Block.setRenderLayer(pistonId, 4); // render with transparency (same layer as plants)
Block.setLightOpacity(pistonId, 0); // let light pass through
// shape for piston head
Block.setShape(pistonId, 0.25, 0, 0.25, 0.75, 1, 0.75, 6); // piston extended y
Block.setShape(pistonId, 0.25, 0.25, 0, 0.75, 0.75, 1, 7); // piston extended z
Block.setShape(pistonId, 0, 0.25, 0.25, 1, 0.75, 0.75, 6 | 0x8); // piston extended x
// allow the piston block to respond to changes in redstone current
Block.setRedstoneConsumer(pistonId, true);

// the sticky piston block.
Block.defineBlock(stickyPistonId,"Crap sticky piston",
	pistonTex(["piston_top_sticky",0],["furnace",3],["piston_inner",0]),
	1,false);
Block.setRedstoneConsumer(stickyPistonId, true);

// add piston to creative inventory
Item.setCategory(pistonId, ItemCategory.TOOL);
Player.addItemCreativeInv(pistonId, 1, 0);
Item.setCategory(stickyPistonId, ItemCategory.TOOL);
Player.addItemCreativeInv(stickyPistonId, 1, 0);

function useItem(x, y, z, itemId, blockId, side) {
	if (itemId == pistonId || itemId == stickyPistonId) {
		pistonUseItem(x, y, z, itemId, blockId, side);
	}
}

// handles placing piston blocks with the correct orientation
function pistonUseItem(x, y, z, itemId, blockId, side) {
	preventDefault();
	setTile(x + directions[side][0], y + directions[side][1], z + directions[side][2], itemId, pistonDataFor(x, y, z));
}

// does the modulus operation with negative numbers taken into account; i.e. mod(-1, 4) == 3
function mod(a, b) {
	var out = a % b;
	if (out < 0) out += b;
	return out;
}

// calculates the correct orientation of the piston from the player's position and returns the corresponding data value
function pistonDataFor(x, y, z) {
	// from Desktop edition.
	var player = getPlayerEnt();
	var pX = Entity.getX(player);
	var pY = Entity.getY(player);
	var pZ = Entity.getZ(player);
	if (Math.abs(pX - x) < 2.0 && Math.abs(pZ - z) < 2.0)
        {
            var headY = pY;

            if (headY - y > 2.0)
            {
                return BlockFace.UP;
            }

            if (y - headY > 0.0)
            {
                return BlockFace.DOWN;
            }
        }

	var yaw = Entity.getYaw(player);

        var quadrant = ((mod(yaw, 360) * 4 / 360) + 0.5) & 3;
	var faces = [BlockFace.NORTH, BlockFace.EAST, BlockFace.SOUTH, BlockFace.WEST];
        return faces[quadrant];
}

function getPlaceAgainstCoords(x, y, z, side) {
	var dir = directions[side];
	return [x + dir[0], y + dir[1], z + dir[2]];
}

function redstoneUpdateHook(x, y, z, newCurrent, worldLoading, blockId, blockDamage) {
	if (blockId != pistonId && blockId != stickyPistonId) return;
	var active = newCurrent != 0;
	var currentlyExtended = (blockDamage & 0x8) != 0;
	var side = blockDamage & 0x7;
	if (side == 6 || side == 7) return; // piston head
	if (currentlyExtended && !active) {
		// retract
		// find the coordinates of the piston head from the current block's position and orientation
		var pistonHead = getPlaceAgainstCoords(x, y, z, side);
		if (blockId == stickyPistonId) {
			// find the coordinates of the block stuck to the piston head
			var stuck = getPlaceAgainstCoords(pistonHead[0], pistonHead[1], pistonHead[2], side);
			var stuckId = getTile(stuck[0], stuck[1], stuck[2]);
			var stuckData = Level.getData(stuck[0], stuck[1], stuck[2]);
			// replace piston head with stuck block
			setTile(pistonHead[0], pistonHead[1], pistonHead[2], stuckId, stuckData);
			// and remove old stuck block
			setTile(stuck[0], stuck[1], stuck[2], 0);
		} else {
			// remove piston head
			setTile(pistonHead[0], pistonHead[1], pistonHead[2], 0);
		}
		// clear extended bit in data value
		setTile(x, y, z, blockId, blockDamage & 0x7);
		Level.playSound(x, y, z, "random.eat", 1, 0.5); // piston retract sound
	} else if (!currentlyExtended && active) {
		// extend
		var dir = directions[side];
		var pistonCount = -1; // how many blocks to push
		for (var i = 1; i <= pistonMaxPush; i++) {
			if (getTile(x + (i*dir[0]), y + (i*dir[1]), z + (i*dir[2])) == 0) {
				// found empty space - so stop pushing here
				pistonCount = i;
				break;
			}
		}
		if (pistonCount != -1) { // can push blocks
			var headData = pistonFwd[(side / 2)|0];
			// starting from the last block to push, push every block forward by 1
			for (var i = pistonCount - 1; i >= 0; --i) {
				var bId, bData;
				if (i == 0) { // head
					// the block to push forward is the piston head
					bId = pistonId;
					bData = headData;
				} else {
					// read data from the block's current position
					bId = getTile(x + (i*dir[0]), y + (i*dir[1]), z + (i*dir[2]));
					bData = Level.getData(x + (i*dir[0]), y + (i*dir[1]), z + (i*dir[2]));
				}
				// push the block forward by 1 along the piston's direction
				setTile(x + ((i+1)*dir[0]), y + ((i+1)*dir[1]), z + ((i+1)*dir[2]), bId, bData);
			}
			// set extended bit in data value
			setTile(x, y, z, blockId, blockDamage | 0x8);
			Level.playSound(x, y, z, "random.eat", 1, 1.5); // piston extend sound
		}
	}
}

