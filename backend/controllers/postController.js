require("dotenv").config({ path: "./config/.env" });
const { Post } = require("../models");

exports.createPost = (req, res) => {
  Post.create({
    userId: req.body.userId,
    publication: req.body.publication,
    imageUrl: req.body.imageUrl,
  })
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res) => {
  Post.update(
    {
      userId: req.body.userId,
      publication: req.body.publication,
      imageUrl: req.body.imageUrl,
    },
    { where: { userId: req.params.userId } }
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
  Post.findAll({ where: { userId: req.params.userId } })
    .then((post) => res.status(201).json({ post }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res) => {
  Post.destroy({ where: { userId: req.params.userId } })
    .then(() => res.status(201).json({ message: "Post supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
