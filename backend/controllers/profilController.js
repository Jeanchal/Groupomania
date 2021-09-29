require("dotenv").config({ path: "./config/.env" });
const { Profil } = require("../models");

exports.postProfil = (req, res) => {
  Profil.create({
    userId: req.body.userId,
    bio: req.body.bio,
    fonction: req.body.fonction,
    photoProfil: req.body.photoProfil,
  })
    .then(() => res.status(201).json({ message: "Profil créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyProfil = (req, res) => {
  Profil.update(
    {
      bio: req.body.bio,
      fonction: req.body.fonction,
      photoProfil: req.body.photoProfil,
    },
    { where: { userId: req.params.userId } }
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
  Profil.findAll({ where: { userId: req.params.userId } })
    .then((profil) => res.status(201).json({ profil }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteProfil = (req, res) => {
  Profil.destroy({ where: { userId: req.params.userId } })
    .then(() => res.status(201).json({ message: "Profil supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
