const http = require("http");
const App = require("./app");
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT;
const appExpress = new App(port).app;
const server = http.createServer(appExpress);

const model = require("./models");

model.sequelize.sync().then((req) => {
  server.listen(port, () => {
    console.log("Connexion à la database réussie... ");
    console.log("Listening on port " + port);
  });
});
