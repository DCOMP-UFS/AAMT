const { Model, DataTypes } = require('sequelize');

class Imovel extends Model {
  static init(sequelize) {
    super.init({
      numero: DataTypes.INTEGER,
      sequencia: DataTypes.INTEGER,
      responsavel: DataTypes.STRING,
      complemento: DataTypes.STRING,
      tipoImovel: DataTypes.INTEGER,
      ativo: DataTypes.BOOLEAN,
      lng: DataTypes.DECIMAL,
      lat: DataTypes.DECIMAL,
      ativo: DataTypes.BOOLEAN
    }, {
      sequelize,
      tableName: 'imoveis'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Lado, { foreignKey: 'lado_id', as: 'lado' } );
    this.hasMany( models.Vistoria, { foreignKey: 'imovel_id', as: 'vistorias' } );
  }
}

module.exports = Imovel;