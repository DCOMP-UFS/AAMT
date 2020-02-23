const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      cpf:DataTypes.STRING,
      rg: DataTypes.STRING,
      email: DataTypes.STRING,
      usuario: DataTypes.STRING,
      senha: DataTypes.STRING,
      ativo: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.hasMany( models.Atuacao, { foreignKey: 'usuario_id', as: 'atuacoes' } );
  }
}

module.exports = Usuario;