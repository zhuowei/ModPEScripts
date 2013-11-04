/*
Taken from https://raw.github.com/Overv/MineAssemble/master/reference/src/mineassemble.c .
An implementation of http://www.cse[1]orku.ca/~amana/research/grid.pdf
(modified with guidance from http://gamedev.stackexchange.com/questions/47362/cast-ray-to-select-block-in-voxel-game)

Thus, this below method is:
Copyright (C) 2013 Alexander Overvoorde


Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var FACE_LEFT = 0;
var FACE_RIGHT = 1;
var FACE_BOTTOM = 2;
var FACE_TOP = 3;
var FACE_BACK = 4;
var FACE_FRONT = 5;

function raytrace(pos, dir, info, radius) {
    // Finish early if there's no direction
    if (dir[0] == 0.0 && dir[1] == 0.0 && dir[2] == 0.0) {
        info.hit = false;
        return;
    }

    var start = pos.slice(0);

    var x = Math.floor(pos[0]);
    var y = Math.floor(pos[1]);
    var z = Math.floor(pos[2]);

    var x_dir = dir[0] >= 0.0 ? 1 : -1;
    var y_dir = dir[1] >= 0.0 ? 1 : -1;
    var z_dir = dir[2] >= 0.0 ? 1 : -1;

    var dx_off = x_dir > 0 ? 1.0 : 0.0;
    var dy_off = y_dir > 0 ? 1.0 : 0.0;
    var dz_off = z_dir > 0 ? 1.0 : 0.0;

    var x_face = x_dir > 0 ? FACE_LEFT : FACE_RIGHT;
    var y_face = y_dir > 0 ? FACE_BOTTOM : FACE_TOP;
    var z_face = z_dir > 0 ? FACE_BACK : FACE_FRONT;

    var face = FACE_TOP;
    var radius2 = radius * radius;
    
    // Assumption is made that the camera is never outside the world
    while (in_world(x, y, z)) {
        var dx = start[0] - pos[0];
        var dy = start[1] - pos[1];
        var dz = start[2] - pos[2];
        var dist2 = dx*dx + dy*dy + dz*dz;
        if (dist2 > radius2) {
            info.hit = false;
            return;
        }
        // Determine if block is solid
        if (getTile(x, y, z) != 0) {
            var dist = Math.sqrt(dist2);

            pos[0] -= x;
            pos[1] -= y;
            pos[2] -= z;

            // If hit info is requested, no color computation is done
            if (info != null) {

                info.hit = true;
                info.x = x;
                info.y = y;
                info.z = z;
                info.face = face;
                info.dist = dist;

                return;
            }
        }

        // Remaining distance inside this block given ray direction
        var dx = x - pos[0] + dx_off;
        var dy = y - pos[1] + dy_off;
        var dz = z - pos[2] + dz_off;
        
        // Calculate distance for each dimension
        var t1 = dx / dir[0];
        var t2 = dy / dir[1];
        var t3 = dz / dir[2];
        
        // Find closest hit
        if (t1 <= t2 && t1 <= t3) {
            pos[0] += dx;
            pos[1] += t1 * dir[1];
            pos[2] += t1 * dir[2];
            x += x_dir;
            face = x_face;
        }
        if (t2 <= t1 && t2 <= t3) {
            pos[0] += t2 * dir[0];
            pos[1] += dy;
            pos[2] += t2 * dir[2];
            y += y_dir;
            face = y_face;
        }
        if (t3 <= t1 && t3 <= t2) {
            pos[0] += t3 * dir[0];
            pos[1] += t3 * dir[1];
            pos[2] += dz;
            z += z_dir;
            face = z_face;
        }
    }
    info.hit = false;

}

function toDirectionalVector(vector, yaw, pitch) {
	//http://stackoverflow.com/questions/1568568/how-to-convert-euler-angles-to-directional-vector
	vector[0] = Math.cos(yaw) * Math.cos(pitch);
	vector[1] = Math.sin(pitch);
	vector[2] = Math.sin(yaw) * Math.cos(pitch);
}

function in_world(x, y, z) {
	return x >= 0 && x < 256 && y >= 0 && y < 128 && z >= 0 && z < 256;
}

var playerPos = [0, 0, 0];
var playerDir = [0, 0, 0];
var rayTraceInfo = {};

var paintMode = false;

var DEG_TO_RAD = Math.PI / 180;

function modTick() {
	if (!paintMode) return false;
	toDirectionalVector(playerDir, (getYaw() + 90) * DEG_TO_RAD, getPitch() * DEG_TO_RAD * -1);
	playerPos[0] = getPlayerX();
	playerPos[1] = getPlayerY();
	playerPos[2] = getPlayerZ();
	raytrace(playerPos, playerDir, rayTraceInfo, 64);
	if (rayTraceInfo.hit) {
		var itemId = getCarriedItem();
		if (itemId != 0 && itemId < 256) setTile(rayTraceInfo.x, rayTraceInfo.y, rayTraceInfo.z, itemId);
	}
}

function procCmd(cmd) {
	if (cmd != "paintbrush") return;
	paintMode = !paintMode;
	clientMessage("Paint mode is " + (paintMode? "enabled": "disabled"));
}
