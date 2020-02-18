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
    this.belongsToMany( models.TipoPerfil, { 
      through: 'funcoes_tipos_perfis',
      as: 'tipos_perfis',
      foreignKey: 'funcao_id'
    });
  }
}

module.exports = Funcao;