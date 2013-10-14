var MODE_STANDBY = 0;
var MODE_PLAY = 1;
var MODE_RECORD = 2;

var currentRecordBuffer;
var playPointer = 0;
var curMode = MODE_STANDBY;

var waitingForPlaybackTarget = false;

var playerHeight = 1.62;

var playbackTracks = [];

var paused = true;

var startDelay = 0;

var queuedCommands = [];

var removeEntityAtEnd = true;

var enteringSequenceMode = false;

var pausedAtStart = true;

function getYOffset(entity) {
	var entityId = Entity.getEntityTypeId(entity);
	return entityId == 0? 1.62: 0;
}

function useItem(x, y, z, itemId, blockId, side) {
	if (itemId == 267) {
		paused = !paused;
	}
}

function procCmd(cmd) {
	if (enteringSequenceMode) {
		procSequenceCmd(cmd);
		return;
	}
	var data = cmd.split(" ");
	var cmdName = data[0];
	if (cmdName == "record") {
		curMode = MODE_RECORD;
		currentRecordBuffer = [];
		clientMessage("Recording");
	} else if (cmdName == "play") {
		startPlayback(getPlayerEnt(), startDelay);
	} else if (cmdName == "stop") {
		curMode = MODE_STANDBY;
		playbackTracks = [];
	} else if (cmdName == "playsp") {
		var spawnedEntity = spawnPigZombie(getPlayerX(), getPlayerY(), getPlayerZ(), 1, "mob/char.png");
		startPlayback(spawnedEntity, startDelay);
	} else if (cmdName == "playent") {
		waitingForPlaybackTarget = true;
	} else if (cmdName == "save") {
		ModPE.saveData(data[1], JSON.stringify(currentRecordBuffer));
		clientMessage("Saved as " + data[1]);
	} else if (cmdName == "load") {
		currentRecordBuffer = JSON.parse(ModPE.readData(data[1]))
	} else if (cmdName == "delay") {
		startDelay = parseInt(data[1]);
	} else if (cmdName == "seqadd") {
		queuedCommands.push(data.slice(1).join(" "));
	} else if (cmdName == "seqrun") {
		runQueuedCommands();
	} else if (cmdName == "seqsave") {
		ModPE.saveData("_sequence_", JSON.stringify(queuedCommands));
	} else if (cmdName == "seqload") {
		queuedCommands = JSON.parse(ModPE.readData("_sequence_"));
	} else if (cmdName == "seqbegin") {
		clientMessage("Beginning sequence");
		enteringSequenceMode = true;
		queuedCommands = [];
	} else if (cmdName == "pauseatstart") {
		pausedAtStart = (data[1] == "true");
	}
}

function procSequenceCmd(cmd) {
	var data = cmd.split(" ");
	var cmdName = data[0];
	if (cmdName == "seqend") {
		clientMessage("End of sequence");
		enteringSequenceMode = false;
	} else {
		queuedCommands.push(cmd);
		clientMessage(cmd);
	}
}
	

function runQueuedCommands() {
	for (var i = 0; i < queuedCommands.length; i++) {
		procCmd(queuedCommands[i]);
	}
}

function attackHook(attacker, victim) {
	if (waitingForPlaybackTarget) {
		startPlayback(victim, startDelay);
		preventDefault();
		waitingForPlaybackTarget = false;
	} else if (getCarriedItem() == 267) {
		Entity.remove(victim);
		preventDefault();
	}
}

function startPlayback(entity, delay) {
	var playbackTrack = {
		"entity" : entity,
		"pointer": 0,
		"delay": delay,
		"eventList": currentRecordBuffer
	};
	playbackTracks.push(playbackTrack);
	paused = pausedAtStart;
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
	}
	handlePlayback();
}

function handlePlayback() {
	for (var i = playbackTracks.length - 1; i >= 0; i--) {
		var playbackTrack = playbackTracks[i];
		var playbackEntity = playbackTrack["entity"];
		var playbackEventList = playbackTrack["eventList"];
		var delay = playbackTrack["delay"];
		if (!paused && delay > 0) {
			playbackTrack["delay"] -= 1;
		}
		var playPointer = playbackTrack["pointer"];
		var nextPointer = playPointer + 1;
		var record = playbackEventList[playPointer];
		var atEnd = nextPointer >= playbackEventList.length;
		var nextRecord = atEnd? null: playbackEventList[nextPointer];
		setPosition(playbackEntity, record["x"], record["y"] + getYOffset(playbackEntity), record["z"]);
		setRot(playbackEntity, record["yaw"], record["pitch"]);
		setVelX(playbackEntity, atEnd? 0: nextRecord["x"] - record["x"]);
		setVelY(playbackEntity, atEnd? 0: nextRecord["y"] - record["y"]);
		setVelZ(playbackEntity, atEnd? 0: nextRecord["z"] - record["z"]);
		if (nextPointer >= playbackEventList.length) {
			playbackTracks.splice(i, 1);
			if (removeEntityAtEnd && Entity.getEntityTypeId(playbackEntity) != 0) {
				Entity.remove(playbackEntity);
			}
		} else {
			if (!paused && delay <= 0) playbackTrack["pointer"] = nextPointer;
		}
	}
}
