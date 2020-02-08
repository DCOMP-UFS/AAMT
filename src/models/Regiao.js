const { Model, DataTypes } = require('sequelize');

class Regiao extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      sigla: DataTypes.STRING,
      ativo: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'regioes'
    });
  }

  static associate( models ) {
    this.hasMany( models.Estado, { foreignKey: 'regiao_id', as: 'estados' } )
    this.belongsTo( models.Pais, { foreignKey: 'pais_id', as: 'pais' } )
  }
}

module.exports = Regiao;