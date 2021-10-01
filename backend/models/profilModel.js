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
      defaultValue: "./img/profil.jpg",
    },
  });
  return Profil;
};
