const { Model, DataTypes } = require('sequelize');

class Deposito extends Model {
  static init(sequelize) {
    super.init({
      fl_comFoco: DataTypes.BOOLEAN,
      fl_tratado: DataTypes.BOOLEAN,
      fl_eliminado: DataTypes.BOOLEAN,
      tipoRecipiente: DataTypes.STRING,
      sequencia: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'depositos'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Vistoria, { foreignKey: 'vistoria_id', as: 'vistoria' } );
    this.hasMany( models.Tratamento, { foreignKey: 'deposito_id', as: 'tratamentos' } );
    this.hasMany( models.Amostra, { foreignKey: 'deposito_id', as: 'amostras' } );
  }
}

module.exports = Deposito;