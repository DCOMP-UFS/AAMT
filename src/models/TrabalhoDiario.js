const { Model, DataTypes } = require('sequelize');

class TrabalhoDiario extends Model {
  static init(sequelize) {
    super.init({
      data: DataTypes.DATE,
      horaInicio: DataTypes.TIME,
      horaFim: DataTypes.TIME
    }, {
      sequelize,
      tableName: 'trabalhos_diarios'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Usuario, { foreignKey: 'supervisor_id', as: 'supervisor' } );
    this.belongsTo( models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' } );
    this.belongsTo( models.Equipe, { foreignKey: 'equipe_id', as: 'equipe' } );
    this.hasMany( models.Vistoria, { foreignKey: 'trabalho_diario_id', as: 'vistorias' } );
    this.belongsToMany( models.Lado, {
      through: 'rotas',
      as: 'rota',
      foreignKey: 'trabalho_diario_id'
    });
  }
}

module.exports = TrabalhoDiario;