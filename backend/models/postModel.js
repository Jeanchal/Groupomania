module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publication: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });
  return Post;
};
