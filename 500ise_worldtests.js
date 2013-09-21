function procCmd(cmd) {
	var args = cmd.split(" ");
	if (args[0] == "quit") {
		ModPE.leaveGame();
	} else if (args[0] == "world") {
		ModPE.selectLevel(args[1]);
	} /*else if (args[0] == "server") {
		ModPE.joinServer(args[1], 19132);
	} */
}
