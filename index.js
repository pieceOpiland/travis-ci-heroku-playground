const express = require("express");
const http = require("http");
const path = require("path");
const WebSocketServer = require("ws").Server;

const app = express();
const port = process.env.PORT || 8000;

if( process.env.NODE_ENV === "production" ) {
  app.use("/", express.static(path.join(__dirname, "build")));
} else {
  app.use("/", express.static(path.join(__dirname, "web")));
}

app.get("/env", function(req, res){
  res.json({env: process.env.NODE_ENV});
});

const srv = http.createServer(app);

const wss = new WebSocketServer({
  server: srv,
  path: "/ws"
});

wss.broadcast = function broadcast(data){
  wss.clients.forEach(function(client){
    client.send(data);
  });
};

wss.on("connection", function(ws){
  ws.on("message", function(data){
    wss.broadcast(data);
  });
});

srv.listen(port);
console.log("Listening on port %d", port);
