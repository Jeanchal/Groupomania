module.exports = (sequelize, DataTypes) => {
  const Profil = sequelize.define("Profil", {
    profil_id: {
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
    bio: {
      type: DataTypes.TEXT,
      defaultValue: "...",
    },
    fonction: {
      type: DataTypes.STRING,
      defaultValue: "...",
    },
    photo_profil: {
      type: DataTypes.STRING,
      defaultValue: "./img/profil.jpg",
    },
  });
  return Profil;
};
