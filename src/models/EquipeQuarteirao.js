const { Model, DataTypes } = require('sequelize');

class EquipeQuarteirao extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize,
      tableName: 'equipes_quarteiroes'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Equipe, { foreignKey: 'equipe_id', as: 'equipe' } );
    this.belongsTo( models.Quarteirao, { foreignKey: 'quarteirao_id', as: 'quarteirao' } );
  }
}

module.exports = EquipeQuarteirao;