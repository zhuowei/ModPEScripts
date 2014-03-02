function newLevel() {
	if (getTile(128, 64, 128) == 57) return; //already did the spheres
	var spheres = [];
	for (var i = 0; i < 20; i++)
		spheres.push([Math.floor(Math.random() * 64) + 64, Math.floor(Math.random() * 32) + 32,
			Math.floor(Math.random() * 64) + 64, Math.floor(Math.random() * 12) + 4]);
	for (var x = 64; x < 128; x++) {
		print("Progress: " + (x - 64) + "/64");
		for (var z = 64; z < 128; z++) {
			for (var y = 32; y < 96; y++) {
				var insphere = false;
				for (var i = 0; i < spheres.length; i++) {
					var s = spheres[i];
					var a = x - s[0];
					var b = y - s[1];
					var c = z - s[2];
					if ((a*a + b*b + c*c) <= (s[3] * s[3])) {
						insphere = true;
						break;
					}
				}
				if (!insphere) setTile(x, y, z, 0);
			}
		}
	}
	setTile(128, 64, 128, 57);
}
