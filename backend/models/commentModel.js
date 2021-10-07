module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    comment_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentaire: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    date: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: "post_id",
      as: "post",
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return Comment;
};
