const { Model, DataTypes } = require('sequelize');

class Pais extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      sigla: DataTypes.STRING,
      ativo: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'paises'
    });
  }

  static associate( models ) {
    this.hasMany( models.Regiao, { foreignKey: 'pais_id', as: 'regioes' } )
  }
}

module.exports = Pais;