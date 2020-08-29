const { Model, DataTypes } = require('sequelize');

class Tratamento extends Model {
  static init(sequelize) {
    super.init({
      quantidade: DataTypes.FLOAT,
      tecnica: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: 'tratamentos'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Deposito, { foreignKey: 'deposito_id', as: 'deposito' } );
    this.belongsTo( models.Inseticida, { foreignKey: 'inseticida_id', as: 'inseticida' } );
  }
}

module.exports = Tratamento;