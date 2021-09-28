const express = require("express");
const userRoutes = require("./routes/userRoutes");
const profilRoutes = require("./routes/profilRoutes");
const postRoutes = require("./routes/postRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");

class App {
  app;
  database;
  constructor(port) {
    this.app = express();
    this.init();
    this.port = port;
    this.setDatabase;
  }
  init() {
    this.app.use((req, res, next) => {
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
    this.app.use(express.json());
    this.app.set("port", this.port);
    this.app.use("/images", express.static(path.join(__dirname, "images")));
    this.app.use("/api/user", userRoutes);
    this.app.use("/api/profil", profilRoutes);
    this.app.use("/api/post", postRoutes);
    this.app.post("/upload", uploadRoutes);
  }
  setDatabase(connect) {
    this.database = connect;
  }
}

module.exports = App;
