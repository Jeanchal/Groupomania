require("dotenv").config({ path: "./config/.env" });
const fs = require("fs");
const { Post, User } = require("../models");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.createPost = async (req, res) => {
  const objet = {
    uid: req.body.uid,
    pseudo: req.body.pseudo,
    publication: req.body.publication,
    image: req.body.image,
    date: req.body.date,
  };
  try {
    if (req.body.image === "") {
      await Post.create(objet).then((post) => res.status(201).json({ post }));
    } else {
      await pipeline(
        req.file.stream,
        fs.createWriteStream(`${__dirname}/../images/posts/${req.body.image}`)
      );
      await Post.create(objet).then((post) => res.status(201).json({ post }));
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.modifyPost = async (req, res) => {
  const message = { message: "Post modifié !" };
  const where = { where: { post_id: req.params.post_id } };
  try {
    if (req.body.image === "") {
      await Post.update(
        {
          publication: req.body.publication,
        },
        where
      );
      res.status(201).json(message);
    } else {
      await pipeline(
        req.file.stream,
        fs.createWriteStream(`${__dirname}/../images/posts/${req.body.image}`)
      );
      await Post.update(
        {
          publication: req.body.publication,
          image: req.body.image,
        },
        where
      );
      res.status(201).json(message);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllPosts = (req, res) => {
  Post.findAll()
    .then((posts) => res.status(201).json({ posts }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res) => {
  Post.findOne({ where: { post_id: req.params.post_id } })
    .then((post) => res.status(201).json({ post }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.deletePost = async (req, res) => {
  const where = { where: { post_id: req.params.post_id } };

  try {
    if (req.body.image === "") {
      await Post.destroy(where);
      res.status(201).json({ message: "Post supprimé !" });
    } else {
      const post = await Post.findOne(where);
      fs.unlink(`images/posts/${post.image}`, () =>
        console.log(post.image + "supprimé !")
      );
      await Post.destroy(where);
      res.status(201).json({ message: "Post et image supprimés !" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.likePost = async (req, res) => {
  const where = { where: { post_id: req.params.post_id } };
  let tabString;
  let nbLikes;
  let message;
  let msgError;

  const user = await User.findOne({ where: { uid: req.body.uid } });
  const post = await Post.findOne(where);
  const postLikes = JSON.parse(post.users_liked);

  if (user.uid === req.body.uid) {
    try {
      if (req.body.likes === 1) {
        msgError = { error: "impossible, la publication est déja likée !" };
        if (!post.users_liked.includes(req.body.uid)) {
          postLikes.push(req.body.uid);
          tabString = JSON.stringify(postLikes);
          nbLikes = post.nb_likes + 1;
          message = "publication likée !";
        } else {
          res.status(400).json(msgError);
        }
      }
      if (req.body.likes === 0) {
        msgError = { error: "impossible, le like est déja annulé !" };
        if (post.users_liked.includes(req.body.uid)) {
          let indexUser = postLikes.indexOf(req.body.uid);
          postLikes.splice(indexUser, 1);
          nbLikes = post.nb_likes - 1;
          tabString = JSON.stringify(postLikes);
          message = "like annulé !";
        } else {
          res.status(400).json(msgError);
        }
      }
      Post.update(
        {
          users_liked: tabString,
          nb_likes: nbLikes,
        },
        where
      )
        .then(() => res.status(201).json({ message, nbLikes }))
        .catch((error) => res.status(400).json({ error }));
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else {
    res.status(404).json({ error: "Utilisateur inconnu !" });
  }
};

exports.commentPost = async (req, res) => {
  const where = { where: { post_id: req.params.post_id } };
  const post = await Post.findOne(where);
  let nbCommentaires;

  if (req.body.nbComments === 1) nbCommentaires = post.nb_commentaires + 1;
  if (req.body.nbComments === 0) nbCommentaires = post.nb_commentaires - 1;

  Post.update(
    {
      nb_commentaires: nbCommentaires,
    },
    where
  )
    .then(() =>
      res.status(201).json({ message: "Post modifié !", nbCommentaires })
    )
    .catch((error) => res.status(400).json({ error }));
};
