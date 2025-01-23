const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/databaseconfig");
const Usuario = require("./Usuarios");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qtd_curtidas: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
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
    modelName: "Post", 
  }
);


Usuario.hasMany(Post, { foreignKey: "usuario_id" });
Post.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = Post;
