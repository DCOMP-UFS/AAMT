const { Model, DataTypes } = require('sequelize');

class Atividade extends Model {
  static init(sequelize) {
    super.init({
      abrangencia: DataTypes.STRING,
      situacao: DataTypes.STRING
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Metodologia, { foreignKey: 'metodologia_id', as: 'metodologia' } );
    this.belongsTo( models.Objetivo, { foreignKey: 'objetivo_id', as: 'objetivo' } );
    this.belongsTo( models.Ciclo, { foreignKey: 'ciclo_id', as: 'ciclo' } );
    this.belongsTo( models.Ciclo, { foreignKey: 'municipio_id', as: 'municipio' } );
  }
}

module.exports = Atividade;