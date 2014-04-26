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

function modTick() {
	//you must call time_runTimers();
	time_runTimers();

}


var shots = 0;
function takeScreenshotRepeatedly() {
	if (shots > 0) {
		ModPE.takeScreenshot("shots");
		shots--;
		if (shots > 0) {
			setTimeout(takeScreenshotRepeatedly, 10);
			//once every second for 20 times
		}
	}
}

function useItem(x, y, z, i, b, s) {
	shots = 20;
	takeScreenshotRepeatedly();
}
