const { Model, DataTypes } = require('sequelize');

class Membro extends Model {
  static init(sequelize) {
    super.init({
      tipoPerfil: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' } );
    this.belongsTo( models.Equipe, { foreignKey: 'equipe_id', as: 'equipe' } );
  }
}

module.exports = Membro;