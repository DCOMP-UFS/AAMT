const { Model, DataTypes } = require('sequelize');

class SituacaoQuarteirao extends Model {
  static init(sequelize) {
    super.init({
      dataConclusao: DataTypes.DATE,
      situacaoQuarteiraoId: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'situacao_quarteiroes'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Estrato, { foreignKey: 'estrato_id', as: 'estrato' } );
    this.belongsTo( models.Quarteirao, { foreignKey: 'quarteirao_id', as: 'quarteirao' } );
  }
}

module.exports = SituacaoQuarteirao;