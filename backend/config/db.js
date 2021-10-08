require("dotenv").config({ path: "./config/.env" });
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("Connexion database réussie...");
} catch (error) {
  console.error("Connexion database échouée...", error);
}
