const { Model, DataTypes } = require('sequelize');

class Zona extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      ativo: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Municipio, { foreignKey: 'municipio_id', as: 'municipio' } );
    this.hasMany( models.Quarteirao, { foreignKey: 'zona_id', as: 'quarteiroes' } );
  }
}

module.exports = Zona;