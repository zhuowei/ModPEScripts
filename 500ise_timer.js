//timer library and demo script
//public domain: do whatever you want with this
//You need to call time_runTimers() in modTick. See example for details.

//start copying and pasting here

//timers are stored as [id, ticksRemaining, functionPointer, repeating
//(-1 for no repeating, ticks for repeating)] inside the following array.
var time_timers = [];
var time_nextId = 0;

//timerlib_setTimeout(func, ticks):
//after the specified number of in-game ticks, run the function.
//one tick is equal to 1/20th of a second.
//this is different from browser JavaScript, which takes in milliseconds instead.
//returns a timer ID you can use to cancel the timer.

function setTimeout(func, ticks) {
	var id = time_nextId++;
	time_timers.push([id, ticks, func, -1]);
	return id;
}

function setInterval(func, ticks) {
	var id = time_nextId++;
	time_timers.push([id, ticks, func, ticks]);
	return id;
}

//clear a timeout that was previously set with setTimeout.
//pass in the returned ID.
function clearTimeout(id) {
	for (var i = time_timers.length - 1; i >= 0; --i) {
		var t = time_timers[i];
		if (t[0] == id) {
			time_timers.splice(i, 1);
			break;
		}
	}
}

function clearInterval(id) {
	clearTimeout(id);
}

function time_runTimers() {
	for (var i = time_timers.length - 1; i >= 0; --i) {
		var t = time_timers[i];
		t[1]--;
		if (t[1] == 0) {
			t[2]();
			if (t[3] == -1) {
				time_timers.splice(i, 1);
			} else {
				t[1] = t[3];
			}
		}
	}
}

//end copy and paste here

//the stuff below is a demo.
var ticks = 0;
function modTick() {
	//you must call time_runTimers();
	ticks = ticks + 1;
	time_runTimers();

}

var curTimerId = -1;

var countDown = 0;

function procCmd(cmd) {
	// How to use the test script:
	// /timer repeat 20 for a display every second
	// /timer once 100 to display one message after 5 seconds, and stop
	// /timer cancel to cancel the timer
	// /countdown 5 to count down from 5.
	cmd = cmd.split(" ");
	if (cmd[0] == "timer") {
		handleTimerCmd(cmd);
	} else if (cmd[0] == "countdown") {
		handleCountdownCmd(cmd);
	}
}
function handleTimerCmd(cmd) {
	if (cmd[1] == "repeat") {
		clearInterval(curTimerId);
		curTimerId = setInterval(timerCallback, parseInt(cmd[2]));
		clientMessage("Setting timer: current ticks is " + ticks);
	} else if (cmd[1] == "once") {
		clearInterval(curTimerId);
		curTimerId = setTimeout(timerCallback, parseInt(cmd[2]));
		clientMessage("Setting timeout: current ticks is " + ticks);
	} else if (cmd[1] == "cancel") {
		clearInterval(curTimerId);
		clientMessage("Cleared.");
	}
}

function handleCountdownCmd(cmd) {
	clearInterval(curTimerId);
	curTimerId = setInterval(countdownCallback, 20);
	countDown = parseInt(cmd[1]);
	countdownCallback();
}

function timerCallback() {
	clientMessage("Hey! it's now " + ticks);
}

function countdownCallback() {
	var curNum = countDown--;
	clientMessage(curNum);
	if (curNum <= 0) {
		clearInterval(curTimerId);
	}
}
