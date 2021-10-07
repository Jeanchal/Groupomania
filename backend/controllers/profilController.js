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

// //

// exports.postProfil = (req, res) => {
//   Profil.create({
//     uid: req.body.uid,
//     bio: req.body.bio,
//     fonction: req.body.fonction,
//     photo_profil: req.body.photo_profil,
//   })
//     .then(() => res.status(201).json({ message: "Profil créé !" }))
//     .catch((error) => res.status(400).json({ error }));
// };

// exports.deleteProfil = async (req, res) => {
//   const where = { where: { uid: req.params.uid } };
//   try {
//     if (req.body.photo_profil === "profil.jpg") {
//       await Profil.destroy(where);
//       res.status(201).json({ message: "Profil supprimé !" });
//     } else {
//       const profil = await Profil.findOne(where);
//       fs.unlink(`images/profil/${profil.photo_profil}`, () =>
//         console.log(profil.photo_profil + "supprimé !")
//       );
//       await Profil.destroy(where);
//       res.status(201).json({ message: "Profil et image supprimés !" });
//     }
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };
