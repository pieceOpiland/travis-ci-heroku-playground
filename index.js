const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;


app.use("/", express.static(path.join(__dirname, "web")));

const srv = http.createServer(app);

srv.listen(port);
console.log("Listening on port %d", port);
