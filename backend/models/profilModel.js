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
      defaultValue: "profil.jpg",
    },
  });

  Profil.associate = (models) => {
    Profil.belongsTo(models.User, {
      foreignKey: "uid",
      as: "user",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return Profil;
};
