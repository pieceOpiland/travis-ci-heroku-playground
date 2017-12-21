const express = require("express");
const http = require("http");

const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const router = require("./src/routes");

const app = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/todoapp");

app.use(bodyParser.json());
app.use("/rest", router);

if( process.env.NODE_ENV === "production" ) {
  app.use("/", express.static(path.join(__dirname, "build")));
} else {
  app.use("/", express.static(path.join(__dirname, "web")));
}

const srv = http.createServer(app);

srv.listen(port);
console.log("Listening on port %d", port);
