module.exports = (sequelize, DataTypes) => {
  const Profil = sequelize.define("Profil", {
    userId: {
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
    photoProfil: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });
  return Profil;
};
