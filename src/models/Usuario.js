const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      cpf: DataTypes.STRING,
      rg: DataTypes.STRING,
      celular: DataTypes.STRING,
      email: DataTypes.STRING,
      usuario: DataTypes.STRING,
      senha: DataTypes.STRING,
      tipoPerfil: DataTypes.INTEGER,
      ativo: DataTypes.INTEGER,
    }, {
      sequelize
    });
  }
}

module.exports = Usuario;