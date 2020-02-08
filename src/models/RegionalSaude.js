const { Model, DataTypes } = require('sequelize');

class RegionalSaude extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      endereco: DataTypes.STRING,
      ativo: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'regionaisSaude'
    });
  }

  static associate( models ) {
    this.hasMany( models.Municipio, { foreignKey: 'regionalSaude_id', as: 'municipios' } )
    this.belongsTo( models.Estado, { foreignKey: 'estado_id', as: 'estado' } )
  }
}

module.exports = RegionalSaude;