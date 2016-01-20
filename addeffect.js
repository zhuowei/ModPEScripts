function procCmd(s) {
	var a = s.split(" ");
	if (a[0] == "effect") {
		if (a.length < 2 || !(a[1] in MobEffect)) {
			var b = [];
			for (var i in MobEffect) {
				b.push(i)
			}
			clientMessage("effect <effect name> [duration] [amplifier] [ambient (0/1)] [showparticles (0/1)]");
			clientMessage("supported effects: " + b.join(", "));
			return;
		}
		var dur = a[2] || 30;
		var mult = a[3] || 0;
		var ambient = a[4] || 0;
		var showparticles = a[5] || 1;
		Entity.addEffect(getPlayerEnt(), MobEffect[a[1]], parseInt(dur)*20, parseInt(mult),
			parseInt(ambient) != 0, parseInt(showparticles) != 0);
	}
}
