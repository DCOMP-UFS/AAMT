const { Model, DataTypes } = require('sequelize');

class Equipe extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Atividade, { foreignKey: 'atividade_id', as: 'atividade' } );
    this.belongsToMany( models.Quarteirao, {
      through: 'equipes_quarteiroes',
      as: 'quarteiroes',
      foreignKey: 'equipe_id'
    });
    this.hasMany( models.Membro, { foreignKey: 'equipe_id', as: 'membros' } );
  }
}

module.exports = Equipe;