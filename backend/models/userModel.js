module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return User;
};

// bio: {
//   type: DataTypes.TEXT,
//   allowNull: true,
// },
// fonction: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// urlPhotoProfil: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// urlBackgroundProfil: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },