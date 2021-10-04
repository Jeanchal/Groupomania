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
    like: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return Comment;
};
