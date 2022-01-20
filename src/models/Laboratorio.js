const { Model, DataTypes } = require( 'sequelize' );

class Laboratorio extends Model {
  static init( sequelize ) {
    super.init( {
      cnpj            : {
        type      : DataTypes.BIGINT, 
        primaryKey: true
      },
      nome            : DataTypes.STRING,
      endereco        : DataTypes.STRING,
      tipoLaboratorio : DataTypes.ENUM( 'sede', 'privado' ),
      ativo           : DataTypes.BOOLEAN,
    }, {
      sequelize,
      tableName: 'laboratorios'
    } );
  }

  static associate( models ) {
    this.belongsToMany( models.Municipio, { through: 'laboratorios_municipios', foreignKey: 'cnpj', as: 'municipios' } );
    this.hasMany( models.Amostra, { foreignKey: 'cnpj', as: 'amostras' } );
  }
}

module.exports = Laboratorio;