const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.uploadProfil = async (req, res) => {
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../images/profil/${fileName}`)
  );
};

exports.uploadPost = async (req, res) => {
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../images/posts/${fileName}`)
  );
};
