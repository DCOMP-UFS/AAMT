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
    this.belongsTo( models.Localidade, { foreignKey: 'localidade_id', as: 'localidade' } );
  }
}

module.exports = Zona;