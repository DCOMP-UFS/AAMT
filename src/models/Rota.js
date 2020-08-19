const { Model, DataTypes } = require('sequelize');

class Rota extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize,
      tableName: 'rotas'
    });
  }

  static associate( models ) {
    this.belongsTo( models.TrabalhoDiario, { foreignKey: 'trabalho_diario_id', as: 'trabalhoDiario' } );
    this.belongsTo( models.Lado, { foreignKey: 'lado_id', as: 'lado' } );
  }
}

module.exports = Rota;