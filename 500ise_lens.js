var lastCarried = 0;
function modTick() {
	var carried = getCarriedItem();
	if (carried == lastCarried) return;
	if (carried == 264) { // diamond
		ModPE.setFov(8);
	} else if (lastCarried == 264) {
		ModPE.resetFov();
	}
	lastCarried = carried;
}
