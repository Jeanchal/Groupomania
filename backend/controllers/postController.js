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
    .then(() => {
      Post.findAll()
        .then((posts) =>
          res.status(201).json({ message: "Post créé !", posts })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res) => {
  Post.update(
    {
      publication: req.body.publication,
      image_url: req.body.image_url,
    },
    { where: { post_id: req.params.post_id } }
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
  Post.findAll({ where: { post_id: req.params.post_id } })
    .then((post) => res.status(201).json({ post }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.deletePost = (req, res) => {
  Post.destroy({ where: { post_id: req.params.post_id } })
    .then(() => res.status(201).json({ message: "Post supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

// likes et commentaires

exports.likePost = (req, res) => {
  Post.findOne({
    where: { post_id: req.params.post_id },
  }).then((objet) => {
    const nbLikes = objet.dataValues.nb_likes;
    let total;
    if (req.body.nb_likes === 1) {
      total = nbLikes + 1;
    } else {
      total = nbLikes - 1;
    }
    Post.update(
      {
        nb_likes: total,
      },
      { where: { post_id: req.params.post_id } }
    )
      .then(() => res.status(201).json({ nbLikes: total }))
      .catch((error) => res.status(400).json({ error }));
  });
};

exports.commentPost = async (req, res) => {
  const post = await Post.findOne({ where: { post_id: req.params.post_id } });
  try {
    if (req.body.nb_commentaires === 1) {
      Post.update(
        {
          nb_likes: post.nb_commentaires++,
        },
        { where: { post_id: req.params.post_id } }
      )
        .then(() => res.status(201).json({ message: "Post modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    }
    if (req.body.nb_commentaires === 0) {
      Post.update(
        {
          nb_likes: post.nb_commentaires--,
        },
        { where: { post_id: req.params.post_id } }
      )
        .then(() => res.status(201).json({ message: "like annulé !" }))
        .catch((error) => res.status(400).json({ error }));
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
