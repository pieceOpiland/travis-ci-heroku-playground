const express = require("express");
const http = require("http");
const path = require("path");

const app = express();


app.use("/", express.static(path.join(__dirname, "web")));

const srv = http.createServer(app);

srv.listen(8000);
console.log("Listening on port 8000");
