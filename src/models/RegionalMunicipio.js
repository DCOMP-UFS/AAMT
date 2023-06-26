const { Model, DataTypes } = require('sequelize');

class RegionalMunicipio extends Model {
  static init(sequelize) {
    super.init({
        regional_saude_id: {
            type: DataTypes.INTEGER,
            primaryKey:true
        },
        municipio_id:{
            type: DataTypes.INTEGER,
            primaryKey:true
        },
        vinculado: DataTypes.BOOLEAN
    }, {
      sequelize,
      tableName: 'regionais_municipios'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Municipio, { foreignKey: 'municipio_id', as: 'municipio' } );
    this.belongsTo( models.RegionalSaude, { foreignKey: 'regional_saude_id', as: 'regional' } );
  }
}

module.exports = RegionalMunicipio;