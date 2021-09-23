require("dotenv").config({ path: "./config/.env" });
const http = require("http");
const App = require("./app");
const db = require("./config/db");
const app = new App(process.env.PORT, db).appExpress;
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Listenning on port " + process.env.PORT);
});
