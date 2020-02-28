const { Model, DataTypes } = require('sequelize');

class Metodologia extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      sigla: DataTypes.STRING,
      flEstrato: DataTypes.BOOLEAN
    }, {
      sequelize,
      tableName: 'metodologias'
    });
  }

  static associate( models ) {
    this.belongsToMany( models.Objetivo, {
      through: 'metodologias_objetivos',
      as: 'objetivos',
      foreignKey: 'metodologia_id'
    });
  }
}

module.exports = Metodologia;