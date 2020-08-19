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
    this.hasMany( models.TrabalhoDiario, { foreignKey: 'usuario_id', as: 'trabalhosDiarios' } );
    this.hasMany( models.TrabalhoDiario, { foreignKey: 'supervisor_id', as: 'planejamentos' } );
  }
}

module.exports = Usuario;