//rainbow text script by 500 Internal Server Error
//this script is public domain
function procCmd(cmd) {
	cmd = cmd.split(" ");
	if (cmd[0] == "demo") {
		var mystr = [];
		for (var i = 0; i < 0x10; i++) {
			mystr.push("\u00a7");
			mystr.push(i.toString(16));
			mystr.push(i.toString(16));
		}
		clientMessage(mystr.join(""));
	} else if (cmd[0] == "onecolor") {
		clientMessage(ChatColor[cmd[1].toUpperCase()] + cmd.slice(2).join(" "));
	} else if (cmd[0] == "possum") {
		//demos usage of ChatColor constants
		clientMessage(ChatColor.YELLOW + "It's the " + ChatColor.RED + "Red " + ChatColor.GREEN + "Green " + ChatColor.YELLOW + "show!");
	} else if (cmd[0] == "rainbow") {
		clientMessage(rainbow(cmd.slice(1).join(" ")));
	} else if (cmd[0] == "intro") {
		printIntro();
	}
}

function rainbow(str) {
	var out = [];
	for (var i = 0; i < str.length; i++) {
		out.push(ChatColor.BEGIN);
		out.push((i & 0xf).toString(16));
		out.push(str.substring(i, i + 1));
	}
	return out.join("");
}

function printIntro() {
	clientMessage(rainbow("Hi, guys!"));
	clientMessage(rainbow("Can you believe it? Chat in colour!"));
	clientMessage(rainbow("Line wrapping doesn't work, and is turned off :("))
	clientMessage(rainbow("Also works on signs! And multiplayer!"));
	clientMessage(rainbow("Uses standard Minecraft colour codes, like Desktop edition!"));
	clientMessage(rainbow("Mojang, are you watching? ;)"));
	clientMessage(rainbow("Try /demo, /onecolor, /possum, /rainbow, /intro"));
}
