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
    pseudo: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    publication: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    image_url: {
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

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: "uid",
      as: "user",
    });
    Post.hasMany(models.Comment, {
      foreignKey: "post_id",
      as: "post",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return Post;
};
