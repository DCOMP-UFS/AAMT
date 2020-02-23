const { Model, DataTypes } = require('sequelize');

class Funcao extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'funcoes'
    });
  }

  static associate( models ) {
    this.hasMany( models.Permissao, { foreignKey: 'funcao_id', as: 'permissoes' } );
  }
}

module.exports = Funcao;