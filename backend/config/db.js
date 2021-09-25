const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("Groupomania", "jeanchal", "Edenpark@1987", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connexion database réussie...");
} catch (error) {
  console.error("Connexion database échouée...", error);
}
