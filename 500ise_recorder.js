var MODE_STANDBY = 0;
var MODE_PLAY = 1;
var MODE_RECORD = 2;

var currentRecordBuffer;
var playPointer = 0;
var curMode = MODE_STANDBY;

var playbackEntity;
var waitingForPlaybackTarget = false;

var playerHeight = 1.62;

function getYOffset(entity) {
	var entityId = Entity.getEntityTypeId(entity);
	return entityId == 0? 1.62: 0;
}

function procCmd(cmd) {
	var data = cmd.split(" ");
	var cmdName = data[0];
	if (cmdName == "record") {
		curMode = MODE_RECORD;
		currentRecordBuffer = [];
	} else if (cmdName == "play") {
		curMode = MODE_PLAY;
		playPointer = 0;
		playbackEntity = getPlayerEnt();
	} else if (cmdName == "stop") {
		curMode = MODE_STANDBY;
	} else if (cmdName == "playsp") {
		curMode = MODE_PLAY;
		playPointer = 0;
		playbackEntity = spawnPigZombie(getPlayerX(), getPlayerY(), getPlayerZ(), 1, "mob/char.png");
	} else if (cmdName == "playent") {
		waitingForPlaybackTarget = true;
		curMode = MODE_STANDBY;
		playPointer = 0;
	} else if (cmdName == "save") {
		ModPE.saveData(data[1], JSON.stringify(currentRecordBuffer));
	} else if (cmdName == "load") {
		currentRecordBuffer = JSON.parse(ModPE.readData(data[1]))
	}
}

function attackHook(attacker, victim) {
	if (waitingForPlaybackTarget) {
		playbackEntity = victim;
		preventDefault();
		curMode = MODE_PLAY;
		waitingForPlaybackTarget = false;
	}
}

function modTick() {
	if (curMode == MODE_RECORD) {
		var newRecord = {
			"x": getPlayerX(), 
			"y": getPlayerY() - playerHeight,
			"z": getPlayerZ(),
			"yaw": getYaw(),
			"pitch": getPitch()
		}
		currentRecordBuffer.push(newRecord);
	} else if (curMode == MODE_PLAY) {
		var record = currentRecordBuffer[playPointer++];
		var atEnd = playPointer >= currentRecordBuffer.length;
		var nextRecord = atEnd? null: currentRecordBuffer[playPointer];
		setPosition(playbackEntity, record["x"], record["y"] + getYOffset(playbackEntity), record["z"]);
		setRot(playbackEntity, record["yaw"], record["pitch"]);
		setVelX(playbackEntity, atEnd? 0: nextRecord["x"] - record["x"]);
		setVelY(playbackEntity, atEnd? 0: nextRecord["y"] - record["y"]);
		setVelZ(playbackEntity, atEnd? 0: nextRecord["z"] - record["z"]);
		if (playPointer >= currentRecordBuffer.length) 
			curMode = MODE_STANDBY;
	}
}
