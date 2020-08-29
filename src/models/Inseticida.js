const { Model, DataTypes } = require('sequelize');

class Inseticida extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      sigla: DataTypes.STRING,
      tipo: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'inseticidas'
    });
  }

  static associate( models ) {
    this.hasMany( models.Tratamento, { foreignKey: 'inseticida_id', as: 'tratamentos' } );
  }
}

module.exports = Inseticida;