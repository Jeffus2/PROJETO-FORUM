const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/databaseconfig");
const Usuario = require("./Usuarios.js");
const Post = require("./Posts.js");

class Comentario extends Model {}

Comentario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    conteudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qtd_curtidas: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Comentario",
  }
);
Usuario.hasMany(Comentario, { foreignKey: "usuario_id" });
Comentario.belongsTo(Usuario, { foreignKey: "usuario_id" });

Post.hasMany(Comentario, { foreignKey: "post_id" });
Comentario.belongsTo(Post, { foreignKey: "post_id" });

module.exports = Comentario;
