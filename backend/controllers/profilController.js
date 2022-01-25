const fs = require("fs");
require("dotenv").config({ path: "./config/.env" });
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { Profil } = require("../models");

exports.uploadProfil = async (req, res) => {
  const fileName = req.body.name + ".jpg";
  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../images/profil/${fileName}`)
  )
    .then(() => res.status(201).json({ fileName }))
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
  Profil.findOne({ where: { uid: req.params.uid } })
    .then((profil) => res.status(201).json({ profil }))
    .catch((error) => res.status(400).json({ error }));
};
