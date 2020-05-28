const { Model, DataTypes } = require('sequelize');

class Atividade extends Model {
  static init(sequelize) {
    super.init({
      objetivoAtividade: DataTypes.STRING,
      abrangencia: DataTypes.INTEGER,
      situacao: DataTypes.INTEGER,
      responsabilidade: DataTypes.INTEGER,
      flTodosImoveis: DataTypes.BOOLEAN
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Metodologia, { foreignKey: 'metodologia_id', as: 'metodologia' } );
    this.belongsTo( models.Objetivo, { foreignKey: 'objetivo_id', as: 'objetivo' } );
    this.belongsTo( models.Ciclo, { foreignKey: 'ciclo_id', as: 'ciclo', onDelete: 'CASCADE' } );
    this.belongsTo( models.Ciclo, { foreignKey: 'municipio_id', as: 'municipio' } );
    this.hasMany( models.Local, { foreignKey: 'atividade_id', as: 'locais' } );
    this.hasMany( models.Estrato, { foreignKey: 'atividade_id', as: 'estratos' } );
    this.hasMany( models.Equipe, { foreignKey: 'atividade_id', as: 'equipes' } );
  }
}

module.exports = Atividade;