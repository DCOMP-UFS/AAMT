const { Model, DataTypes } = require('sequelize');

class Laboratorio extends Model {
  static init(sequelize) {
    super.init({
      cnpj: DataTypes.BIGINT,
      nome: DataTypes.STRING,
      endereco: DataTypes.STRING,
      tipo_laboratorio: DataTypes.ENUM('sede', 'privado')
    }, {
      sequelize,
      tableName: 'laboratorios'
    });
  }

  static associate( models ) {
    this.hasMany( models.LaboratorioMunicipio, { foreignKey: 'municipio_id', as: 'municipios'} );
    this.hasMany( models.Amostra, { foreignKey: 'laboratorio_id', as: 'amostras' } );
  }
}

module.exports = Laboratorio;