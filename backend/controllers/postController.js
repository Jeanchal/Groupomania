require("dotenv").config({ path: "./config/.env" });
const { Post } = require("../models");

exports.createPost = (req, res) => {
  Post.create({
    uid: req.body.uid,
    pseudo: req.body.pseudo,
    publication: req.body.publication,
    image_url: req.body.image_url,
    date: req.body.date,
  })
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res) => {
  Post.update(
    {
      uid: req.body.uid,
      publication: req.body.publication,
      image_url: req.body.image_url,
    },
    { where: { uid: req.params.uid } }
  )
    .then(() => res.status(201).json({ message: "Post modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res) => {
  Post.findAll()
    .then((posts) => res.status(201).json({ posts }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res) => {
  Post.findAll({ where: { uid: req.params.uid } })
    .then((post) => res.status(201).json({ post }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res) => {
  Post.destroy({ where: { uid: req.params.uid } })
    .then(() => res.status(201).json({ message: "Post supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
