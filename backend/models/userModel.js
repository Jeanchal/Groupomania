module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    uid: {
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
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 4,
        max: 15,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 4,
        max: 25,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 5,
        max: 12,
      },
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Profil, {
      foreignKey: "uid",
      as: "user",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "uid",
      as: "user",
    });
  };
  return User;
};
