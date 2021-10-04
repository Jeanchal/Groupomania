require("dotenv").config({ path: "./config/.env" });
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Profil, Post } = require("../models");

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
                    uid: user.uid,
                    bio: req.body.bio,
                    fonction: req.body.fonction,
                    photo_profil: req.body.photo_profil,
                  });
                  res.status(201).json({
                    pseudo: user.pseudo,
                    uid: user.uid,
                    token: jsonWebToken.sign(
                      { uid: user.uid },
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
            uid: user.uid,
            token: jsonWebToken.sign(
              { uid: user.uid },
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
          uid: req.body.uid,
        },
        { where: { uid: req.params.uid } }
      )
        .then(() => res.status(201).json({ message: "Utilisateur modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res) => {
  User.findOne({ where: { uid: req.params.uid } })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          } else {
            User.destroy({ where: { uid: req.params.uid } })
              .then((user) => {
                if (user) {
                  res.status(201).json({ message: "Utilisateur supprimé !" });
                } else {
                  res
                    .status(404)
                    .json({ message: "Erreur, utilisateur non trouvé !" });
                }
              })
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => res.status(201).json({ users }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.getOneUser = (req, res) => {
  User.findAll({ where: { uid: req.params.uid } })
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(400).json({ error }));
};
