module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
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
  });
  return Comment;
};
