require("dotenv").config({ path: "./config/.env" });
const { Profil } = require("../models");

exports.postProfil = (req, res) => {
  Profil.create({
    uid: req.body.uid,
    bio: req.body.bio,
    fonction: req.body.fonction,
    photo_profil: req.body.photo_profil,
  })
    .then(() => res.status(201).json({ message: "Profil créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyProfil = (req, res) => {
  Profil.update(
    {
      bio: req.body.bio,
      fonction: req.body.fonction,
      photo_profil: req.body.photo_profil,
    },
    { where: { uid: req.params.uid } }
  )
    .then(() => res.status(201).json({ message: "Profil modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllProfils = (req, res) => {
  Profil.findAll()
    .then((profils) => res.status(201).json({ profils }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneProfil = (req, res) => {
  Profil.findAll({ where: { uid: req.params.uid } })
    .then((profil) => res.status(201).json({ profil }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteProfil = (req, res) => {
  Profil.destroy({ where: { uid: req.params.uid } })
    .then(() => res.status(201).json({ message: "Profil supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
