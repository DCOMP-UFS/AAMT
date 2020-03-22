const { Model, DataTypes } = require('sequelize');

class Municipio extends Model {
  static init(sequelize) {
    super.init({
      codigo: DataTypes.INTEGER,
      nome: DataTypes.STRING,
      ativo: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.RegionalSaude, { foreignKey: 'regional_saude_id', as: 'regional' } );
    this.hasMany( models.Atividade, { foreignKey: 'municipio_id', as: 'atividades' } );
    this.hasMany( models.Localidade, { foreignKey: 'municipio_id', as: 'localidades' } );
    this.hasMany( models.Zona, { foreignKey: 'municipio_id', as: 'zonas' } );
  }
}

module.exports = Municipio;