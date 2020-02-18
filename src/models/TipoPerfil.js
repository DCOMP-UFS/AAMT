const { Model, DataTypes } = require('sequelize');

class TipoPerfil extends Model {
  static init(sequelize) {
    super.init({
      descricao: DataTypes.STRING,
      sigla: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'tipos_perfis'
    });
  }

  static associate( models ) {
    this.belongsToMany( models.Funcao, { 
      through: 'funcoes_tipos_perfis',
      as: 'funcoes',
      foreignKey: 'tipo_perfil_id'
    });

    this.belongsToMany( models.Usuario, { 
      through: 'atuacoes',
      as: 'usuarios',
      foreignKey: 'tipo_perfil_id'
    });
  }
}

module.exports = TipoPerfil;