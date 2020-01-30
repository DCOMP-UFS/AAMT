const { Model, DataTypes } = require('sequelize');

class Localidade extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      codigo: DataTypes.INTEGER,
      ativo: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Municipio, { foreignKey: 'municipio_id', as: 'municipio' } );
    this.belongsTo( models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' } );
  }
}

module.exports = Localidade;