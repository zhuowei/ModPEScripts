//script that helps you generate a title screen panorama
//tap on ground to start rotating -  will stay on each rotation for 5 seconds
//for best results patch fovtest.mod and tinyrender.mod immediately after you start panohelper
var imageName = 0;

var yaws = [0, 90, 180, 270, 0, 0];
var pitches = [0, 0, 0, 0, -90, 90];

var countdown = -2;

var isCountingDown = false;

function useItem(x, y, z, itemId, blockId, side) {
	countdown = 100;
	isCountingDown = true;
	preventDefault();
}
function modTick() {
	if (!isCountingDown) return;
	if (countdown == 0) {
		var currentImage = imageName;
		setRot(getPlayerEnt(), yaws[currentImage], pitches[currentImage]);
		imageName = (imageName + 1) % 6;
		countdown = 100; //5 seconds between pictures
	} else {
		countdown --;
	}

}
