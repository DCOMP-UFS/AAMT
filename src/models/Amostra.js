const { Model, DataTypes } = require('sequelize');

class Amostra extends Model {
  static init(sequelize) {
    super.init({
      situacaoAmostra: DataTypes.INTEGER,
      sequencia: DataTypes.INTEGER,
      codigo: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'amostras'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Deposito, { foreignKey: 'deposito_id', as: 'deposito' } );
    this.belongsTo( models.Laboratorio, { foreignKey: 'laboratorio_id', as: 'laboratorio' } );
    this.hasMany( models.Exemplar, { foreignKey: 'amostra_id', as: 'exemplares' } );
  }
}

module.exports = Amostra;