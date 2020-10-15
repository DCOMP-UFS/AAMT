const { Model, DataTypes } = require('sequelize');

class Objetivo extends Model {
  static init(sequelize) {
    super.init({
      sigla: DataTypes.STRING,
      descricao: DataTypes.STRING,
      numero: DataTypes.INTEGER,
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsToMany( models.Metodologia, {
      through: 'metodologias_objetivos',
      as: 'metodologias',
      foreignKey: 'objetivo_id'
    });
  }
}

module.exports = Objetivo;