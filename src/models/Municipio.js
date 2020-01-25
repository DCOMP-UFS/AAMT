const { Model, DataTypes } = require('sequelize');

class Municipio extends Model {
  static init(sequelize) {
    super.init({
      codigo: DataTypes.INTEGER,
      nome: DataTypes.STRING,
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.hasMany( models.Usuario, { foreignKey: 'municipio_id', as: 'usuarios' } )
  }
}

module.exports = Municipio;