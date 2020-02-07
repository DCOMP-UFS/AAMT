const { Model, DataTypes } = require('sequelize');

class Quarteirao extends Model {
  static init(sequelize) {
    super.init({
      numero: DataTypes.INTEGER,
      ativo: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'quarteiroes'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Quarteirao, { foreignKey: 'quarteirao_id', as: 'quarteirao' } );
    this.hasMany( models.Quarteirao, { foreignKey: 'quarteirao_id', as: 'quarteiroes' } );
    this.belongsTo( models.Zona, { foreignKey: 'zona_id', as: 'zona' } );
  }
}

module.exports = Quarteirao;