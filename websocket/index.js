// Importing the required modules
const WebSocketServer = require("ws");

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8000 });
const backendMessageHandlers = new Set();

const helper = require("./requestHandles");

// Creating connection using websocket
wss.once("connection", (ws) => {
  ws.on("message", (data) => {

    const message = Buffer.from(data);
    const event = message.toString();

    console.log(event);
    helper.handleRequest(ws, event);
  });

  ws.onerror = function () {
    console.log("Some Error occurred");
  };
});
console.log("The WebSocket server is running on port 8000");
