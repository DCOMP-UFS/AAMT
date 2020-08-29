const { Model, DataTypes } = require('sequelize');

class Exemplar extends Model {
  static init(sequelize) {
    super.init({
      quantidade: DataTypes.INTEGER,
      fase: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: 'exemplares'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Amostra, { foreignKey: 'amostra_id', as: 'amostra' } );
    this.belongsTo( models.Mosquito, { foreignKey: 'mosquito_id', as: 'mosquito' } );
  }
}

module.exports = Exemplar;