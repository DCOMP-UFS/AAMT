const { Model, DataTypes } = require('sequelize');

class Permissao extends Model {
  static init(sequelize) {
    super.init({
      tipoPerfil: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: 'permissoes'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Funcao, { foreignKey: 'funcao_id', as: 'funcao' } );
  }
}

module.exports = Permissao;