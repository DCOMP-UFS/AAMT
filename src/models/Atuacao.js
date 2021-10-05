const { Model, DataTypes } = require('sequelize');

class Atuacao extends Model {
  static init(sequelize) {
    super.init({
      tipoPerfil: DataTypes.INTEGER,
      escopo: DataTypes.INTEGER,
      local_id: DataTypes.INTEGER,
      sequencia_usuario: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'atuacoes'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' } );
  }
}

module.exports = Atuacao;