const { Model, DataTypes } = require('sequelize');

class Estrato extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Atividade, { foreignKey: 'atividade_id', as: 'atividade' } );
    this.belongsToMany( models.Quarteirao, {
      through: 'situacao_quarteiroes',
      as: 'quarteiroes',
      foreignKey: 'estrato_id'
    });
  }
}

module.exports = Estrato;