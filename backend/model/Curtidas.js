const sequelize = require("../config/databaseconfig");
const { DataTypes, Model } = require("sequelize");
const Post = require("./Posts");
const Usuario = require("./Usuarios");
const Comentario = require("./Comentarios");

class Curtida extends Model {}

Curtida.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.ENUM("post", "comentario"),
      allowNull: false,
    },
    referencia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Curtidas",
  }
);

//usuario
Usuario.hasMany(Curtida, { foreignKey: "usuario_id" });
Curtida.belongsTo(Usuario, { foreignKey: "usuario_id" });

//posts
Post.hasMany(Curtida, {
  foreignKey: "referencia_id",
  scope: { tipo: "post" },
});
Curtida.belongsTo(Post, { foreignKey: "referencia_id" });

//comentarios
Comentario.hasMany(Curtida, {
  foreignKey: "referencia_id",
  scope: { tipo: "comentario" },
});
Curtida.belongsTo(Comentario, { foreignKey: "referencia_id" });

module.exports = Curtida;
