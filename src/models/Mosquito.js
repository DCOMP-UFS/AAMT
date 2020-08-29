const { Model, DataTypes } = require('sequelize');

class Mosquito extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'mosquitos'
    });
  }

  static associate( models ) {
    this.hasMany( models.Exemplar, { foreignKey: 'mosquito_id', as: 'exemplares' } );
  }
}

module.exports = Mosquito;