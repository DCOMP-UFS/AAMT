const { Model, DataTypes } = require('sequelize');

class Estado extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      sigla: DataTypes.STRING,
      ativo: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.hasMany( models.RegionalSaude, { foreignKey: 'estado_id', as: 'regionaisSaude' } )
    this.belongsTo( models.Regiao, { foreignKey: 'regiao_id', as: 'regiao' } )
  }
}

module.exports = Estado;