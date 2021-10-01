require("dotenv").config({ path: "./config/.env" });
const { Comment } = require("../models");

exports.createComment = (req, res) => {
  Comment.create({
    userId: req.body.userId,
    pseudo: req.body.pseudo,
    post_id: req.body.post_id,
    commentaire: req.body.commentaire,
    like: req.body.like,
    date: req.body.date,
  })
    .then(() => res.status(201).json({ message: "Commentaire créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyComment = (req, res) => {
  Comment.update(
    {
      userId: req.body.userId,
      pseudo: req.body.pseudo,
      post_id: req.body.post_id,
      commentaire: req.body.commentaire,
      like: req.body.like,
      date: req.body.date,
    },
    { where: { userId: req.params.userId } }
  )
    .then(() => res.status(201).json({ message: "Commentaire modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res) => {
  Comment.findAll()
    .then((comments) => res.status(201).json({ comments }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneComment = (req, res) => {
  Comment.findAll({ where: { userId: req.params.userId } })
    .then((comment) => res.status(201).json({ comment }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res) => {
  Comment.destroy({ where: { userId: req.params.userId } })
    .then(() => res.status(201).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
