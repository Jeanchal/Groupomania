require("dotenv").config({ path: "./config/.env" });
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Profil } = require("../models");

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (!user) {
          User.findOne({ where: { pseudo: req.body.pseudo } }).then((user) => {
            if (!user) {
              User.create({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
              })
                .then((user) => {
                  Profil.create({
                    userId: user.userId,
                    bio: req.body.bio,
                    fonction: req.body.fonction,
                    photoProfil: req.body.photoProfil,
                  });
                  res.status(201).json({
                    pseudo: user.pseudo,
                    userId: user.userId,
                    token: jsonWebToken.sign(
                      { userId: user.userId },
                      process.env.SECURITY_TOKEN,
                      {
                        expiresIn: "24h",
                      }
                    ),
                    message: "Utilisateur connecté !",
                  });
                })
                .catch((error) => res.status(400).json({ error }));
            } else {
              res
                .status(400)
                .json({ message: "Erreur, pseudo déja utilisé !" });
            }
          });
        } else {
          res
            .status(400)
            .json({ message: "Erreur, adresse email déja utilisée !" });
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
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
            pseudo: user.pseudo,
            userId: user.userId,
            token: jsonWebToken.sign(
              { userId: user.userId },
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
      User.update(
        {
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash,
          userId: req.body.userId,
        },
        { where: { userId: req.params.userId } }
      )
        .then(() => res.status(201).json({ message: "Utilisateur modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res) => {
  User.destroy({ where: { userId: req.params.userId } })
    .then((user) => {
      if (user) {
        res.status(201).json({ message: "Utilisateur supprimé !" });
      } else {
        res.status(404).json({ message: "Erreur, utilisateur non trouvé !" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => res.status(201).json({ users }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneUser = (req, res) => {
  User.findAll({ where: { userId: req.params.userId } })
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(400).json({ error }));
};
