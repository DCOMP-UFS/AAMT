const { Model, DataTypes } = require('sequelize');

class Ciclo extends Model {
  static init(sequelize) {
    super.init({
      ano: DataTypes.INTEGER,
      dataInicio: DataTypes.DATE,
      dataFim: DataTypes.DATE,
      sequencia: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.RegionalSaude, { foreignKey: 'regional_saude_id', as: 'regional' } );
    this.hasMany( models.Atividade, { foreignKey: 'ciclo_id', as: 'atividades' } );
  }
}

module.exports = Ciclo;