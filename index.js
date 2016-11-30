const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");

const router = require("./src/routes");

const app = express();
const port = process.env.PORT || 8000;

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
