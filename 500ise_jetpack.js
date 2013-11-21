var playerDir = [0, 0, 0];

function modTick() {
	if (getCarriedItem() == 280) {
		jetpackTick();
	}
}

function jetpackTick() {
	toDirectionalVector(playerDir, (getYaw() + 90) * DEG_TO_RAD, getPitch() * DEG_TO_RAD * -1);
	var player = getPlayerEnt();
	setVelX(player, playerFlySpeed * playerDir[0]);
	setVelY(player, playerFlySpeed * playerDir[1]);
	setVelZ(player, playerFlySpeed * playerDir[2]);
}


function toDirectionalVector(vector, yaw, pitch) {
	//http://stackoverflow.com/questions/1568568/how-to-convert-euler-angles-to-directional-vector
	vector[0] = Math.cos(yaw) * Math.cos(pitch);
	vector[1] = Math.sin(pitch);
	vector[2] = Math.sin(yaw) * Math.cos(pitch);
}
