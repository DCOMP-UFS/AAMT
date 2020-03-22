const { Model, DataTypes } = require('sequelize');

class Local extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize,
      tableName: 'locais'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Atividade, { foreignKey: 'atividade_id', as: 'atividade' } );
  }
}

module.exports = Local;