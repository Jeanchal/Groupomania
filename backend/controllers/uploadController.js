const fs = require("fs");
require("dotenv").config({ path: "./config/.env" });
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.uploadProfil = async (req, res) => {
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../images/profil/${fileName}`)
  )
    .then(() =>
      res.status(201).json({
        message: `image enregistrée ! (http://localhost:${process.env.PORT}/images/profil/${fileName})`,
        fileName,
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.uploadPost = async (req, res) => {
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../images/posts/${fileName}`)
  )
    .then(() =>
      res.status(201).json({
        message: `image enregistrée ! (http://localhost:${process.env.PORT}/images/posts/${fileName})`,
        fileName,
      })
    )
    .catch((error) => res.status(400).json({ error }));
};
