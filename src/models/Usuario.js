const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      cpf:DataTypes.STRING,
      rg: DataTypes.STRING,
      email: DataTypes.STRING,
      usuario: DataTypes.STRING,
      senha: DataTypes.STRING,
      ativo: DataTypes.INTEGER,
      celular: DataTypes.STRING
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.hasMany( models.Atuacao, { foreignKey: 'usuario_id', as: 'atuacoes' } );
    this.hasMany( models.TrabalhoDiario, { foreignKey: 'usuario_id', as: 'trabalhosDiarios' } );
    this.hasMany( models.TrabalhoDiario, { foreignKey: 'supervisor_id', as: 'planejamentos' } );
    // this.belongsToMany( models.Equipe, {
    //   through: 'membros',
    //   as: 'equipes',
    //   foreignKey: 'usuario_id'
    // });
  }
}

module.exports = Usuario;