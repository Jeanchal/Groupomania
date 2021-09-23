const express = require("express");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

class App {
  appExpress;
  database;
  constructor(port) {
    this.appExpress = express();
    this.init();
    this.port = port;
    this.setDatabase;
  }
  init() {
    this.appExpress.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      );
      next();
    });

    this.appExpress.use(express.json());
    this.appExpress.use(
      "/images",
      express.static(path.join(__dirname, "images"))
    );
    this.appExpress.use("/api/user", userRoutes);
    this.appExpress.set("port", this.port);
  }
  setDatabase(connect) {
    this.database = connect;
  }
}

module.exports = App;
