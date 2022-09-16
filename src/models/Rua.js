const { Model, DataTypes } = require('sequelize');

class Rua extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      cep: DataTypes.STRING,
      ativo: DataTypes.BOOLEAN
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Localidade, { foreignKey: 'localidade_id', as: 'localidade' } );
    this.hasMany( models.Lado, { foreignKey: 'rua_id', as: 'lados' } );
  }
}

module.exports = Rua;