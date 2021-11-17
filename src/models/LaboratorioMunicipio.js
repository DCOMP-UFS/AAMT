const { Model, DataTypes } = require('sequelize');

class LaboratorioMunicipio extends Model {
  static init(sequelize) {
    super.init({
      cnpj: DataTypes.BIGINT,
      municipio_id: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: 'laboratorios_municipios'
    });
  }

  static associate( models ) {
    this.hasMany( models.Laboratorio, { foreignKey: 'cnpj', as: 'laboratorios'} );
    this.hasMany( models.Municipio, { foreignKey: 'municipio_id', as: 'municipios'});
  }
}

module.exports = LaboratorioMunicipio;