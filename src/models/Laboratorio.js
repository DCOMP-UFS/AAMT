const { Model, DataTypes } = require( 'sequelize' );

class Laboratorio extends Model {
  static init( sequelize ) {
    super.init( {
      id            : {
        type      : DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
      cnpj            : DataTypes.BIGINT,
      nome            : DataTypes.STRING,
      endereco        : DataTypes.STRING,
      tipoLaboratorio : DataTypes.ENUM( 'sede', 'privado' ),
    }, {
      sequelize,
      tableName: 'laboratorios'
    } );
  }

  static associate( models ) {
    this.belongsToMany( models.Municipio, { through: 'laboratorios_municipios', foreignKey: 'laboratorio_id', as: 'municipios' } );
    this.hasMany( models.Amostra, { foreignKey: 'id', as: 'amostras' } );
  }
}

module.exports = Laboratorio;