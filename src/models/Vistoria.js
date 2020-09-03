const { Model, DataTypes } = require('sequelize');

class Vistoria extends Model {
  static init(sequelize) {
    super.init({
      situacaoVistoria: DataTypes.STRING,
      horaEntrada: DataTypes.TIME,
      pendencia: DataTypes.STRING,
      sequencia: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'vistorias'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Imovel, { foreignKey: 'imovel_id', as: 'imovel' } );
    this.belongsTo( models.TrabalhoDiario, { foreignKey: 'trabalho_diario_id', as: 'trabalhoDiario' } );
    this.hasMany( models.Deposito, { foreignKey: 'vistoria_id', as: 'depositos' } );
  }
}

module.exports = Vistoria;