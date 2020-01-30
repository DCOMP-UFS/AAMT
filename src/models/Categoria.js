const { Model, DataTypes } = require('sequelize');

class Categoria extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
      ativo: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'categorias'
    });
  }

  static associate( models ) {
    this.hasMany( models.Localidade, { foreignKey: 'categoria_id', as: 'localidades' } )
  }
}

module.exports = Categoria;