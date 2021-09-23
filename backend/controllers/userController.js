require("dotenv").config({ path: "./config/.env" });
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.signup = (req, res) => {
  const randomNum = Math.floor(Math.random() * 1000000000);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      let sql = `INSERT INTO Users
      SET pseudo='${req.body.pseudo}', 
      email='${req.body.email}', 
      password='${hash}', 
      userId='${randomNum}';`;
      db.query(sql, (err, result) => {
        if (err) throw err;
      });
    })
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jsonWebToken.sign(
              { userId: user._id },
              process.env.SECURITY_TOKEN,
              {
                expiresIn: "24h",
              }
            ),
            message: "Utilisateur connecté !",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      });
      User.updateOne({ _id: req.params.id }, user)
        .then(() => res.status(201).json({ message: "Utilisateur modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((oneUser) => res.status(200).json(oneUser))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(200).json({ article, message: "Utilisateur supprimé !" })
    )
    .catch((error) => res.status(400).json({ error: error }));
};
