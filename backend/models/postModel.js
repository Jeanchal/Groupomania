module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    post_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pseudo: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    publication: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    date: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    nb_likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    nb_commentaires: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  return Post;
};
