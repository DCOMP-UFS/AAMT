const { Model, DataTypes } = require('sequelize');

class Lado extends Model {
  static init(sequelize) {
    super.init({
      numero: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Rua, { foreignKey: 'rua_id', as: 'rua' } );
    this.belongsTo( models.Quarteirao, { foreignKey: 'quarteirao_id', as: 'quarteirao' } );
    this.hasMany( models.Imovel, { foreignKey: 'lado_id', as: 'imoveis' } );
  }
}

module.exports = Lado;