require("dotenv").config({ path: "./config/.env" });
const fs = require("fs");
const { Post } = require("../models");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.createPost = async (req, res) => {
  const objet = {
    uid: req.body.uid,
    pseudo: req.body.pseudo,
    publication: req.body.publication,
    image_url: req.body.image_url,
    date: req.body.date,
  };
  try {
    if (req.body.image_url === "") {
      await Post.create(objet);
      res.status(201).json({ message: "Post créé !" });
    } else {
      await pipeline(
        req.file.stream,
        fs.createWriteStream(
          `${__dirname}/../images/posts/${req.body.image_url}`
        )
      );
      await Post.create(objet);
      res.status(201).json({ message: "Post créé !" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
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

exports.likePost = async (req, res) => {
  const post = await Post.findOne({
    where: { post_id: req.params.post_id },
  });
  const postLikes = JSON.parse(post.users_liked);
  let tabString;
  let nbLikes;
  let message;
  try {
    if (req.body.likes === 1) {
      if (!post.users_liked.includes(req.body.uid)) {
        postLikes.push(req.body.uid);
        tabString = JSON.stringify(postLikes);
        nbLikes = post.nb_likes + 1;
        message = "publication likée !";
      } else {
        res
          .status(400)
          .json({ error: "impossible, la publication est déja likée !" });
      }
    }
    if (req.body.likes === 0) {
      if (post.users_liked.includes(req.body.uid)) {
        let indexUser = postLikes.indexOf(req.body.uid);
        postLikes.splice(indexUser, 1);
        nbLikes = post.nb_likes - 1;
        tabString = JSON.stringify(postLikes);
        message = "like annulé !";
      } else {
        res
          .status(400)
          .json({ error: "erreur, la publication n'est pas likée !" });
      }
    }
    Post.update(
      {
        users_liked: tabString,
        nb_likes: nbLikes,
      },
      { where: { post_id: req.params.post_id } }
    )
      .then(() => res.status(201).json({ message, nbLikes }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.commentPost = async (req, res) => {
  const post = await Post.findOne({
    where: { post_id: req.params.post_id },
  });
  let nbCommentaires;
  if (req.body.nbComments === 1) nbCommentaires = post.nb_commentaires + 1;
  if (req.body.nbComments === 0) nbCommentaires = post.nb_commentaires - 1;
  Post.update(
    {
      nb_commentaires: nbCommentaires,
    },
    { where: { post_id: req.params.post_id } }
  )
    .then(() =>
      res.status(201).json({ message: "Post modifié !", nbCommentaires })
    )
    .catch((error) => res.status(400).json({ error }));
};
