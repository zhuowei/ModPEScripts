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
				print(e);
			}
		}
	}));
	thread.start();
}

function clientLoop(clientSocket) {
	var is = clientSocket.getInputStream();
	var os = clientSocket.getOutputStream();
	var dis = new java.io.DataInputStream(is);
	var dos = new java.io.DataOutputStream(os);
	while (!clientSocket.isClosed()) {
		var cmd = String(dis.readUTF());
		var response = String(eval(cmd));
		print(cmd + ":" + response);
		dos.writeUTF(response);
	}
}

startServer();
})();
