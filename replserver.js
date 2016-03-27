(function() {
var serverSocket, mainThread;
function startServer() {
	mainThread = new java.lang.Thread(new java.lang.Runnable({
		run: mainLoop
	}));
	mainThread.start();
}

function mainLoop() {
	try {
		setupSocket();
		while (!serverSocket.isClosed()) {
			var clientSocket = serverSocket.accept();
			handleClientSocket(clientSocket);
		}
	} catch (e) {
		print(e + ":" + e.lineNumber);
	}
}

function setupSocket() {
	serverSocket = new java.net.ServerSocket(0);
	print("Socket set up at " + serverSocket.getLocalPort());
}

function handleClientSocket(clientSocket) {
	var thread = new java.lang.Thread(new java.lang.Runnable({
		run: function() {
			try {
				clientLoop(clientSocket);
			} catch (e) {
				//print(e);
				//Prevent broken pipe exception when disconnecting (I think?)
			}
		}
	}));
	thread.start();
}

function clientLoop(clientSocket) {
	var is = clientSocket.getInputStream();
	var os = clientSocket.getOutputStream();
	var isr = new java.io.InputStreamReader(is);
	var osw = new java.io.OutputStreamWriter(os);
	var br = new java.io.BufferedReader(isr);
	var bw = new java.io.BufferedWrier(osw):
	while (!clientSocket.isClosed()) {
		var cmd = String(br.readLine()).trim();
		if(cmd != null && cmd != "") {
			try {
				var response = String(eval(cmd)).trim();
			} catch(e) {
				var response = e;
			}
			android.widget.Toast.makeText(com.mojang.minecraftpe.MainActivity.currentMainActivity.get(), cmd + " | " + response, 1).show();
			bw.write(response);
			bw.flush();
		}
	}
}

startServer();
})();
