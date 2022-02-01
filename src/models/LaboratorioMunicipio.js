const { Model, DataTypes } = require('sequelize');

class LaboratorioMunicipio extends Model {
  static init(sequelize) {
    super.init({
      cnpj: DataTypes.BIGINT,
      municipio_id: DataTypes.INTEGER,
      ativo           : DataTypes.BOOLEAN,
    }, {
      sequelize,
      tableName: 'laboratorios_municipios'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Laboratorio, { foreignKey: 'cnpj', as: 'laboratorios'} );
    this.belongsTo( models.Municipio, { foreignKey: 'municipio_id', as: 'municipios'});
  }
}

module.exports = LaboratorioMunicipio;