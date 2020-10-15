const { Model, DataTypes } = require('sequelize');

class Laboratorio extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      endereco: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'laboratorios'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Localidade, { foreignKey: 'localidade_id', as: 'localidade' } );
    this.hasMany( models.Amostra, { foreignKey: 'laboratorio_id', as: 'amostras' } );
  }
}

module.exports = Laboratorio;