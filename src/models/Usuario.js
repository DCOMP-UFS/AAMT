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
      ativo: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Municipio, { foreignKey: 'municipio_id', as: 'municipio' } );

    this.belongsToMany( models.TipoPerfil, { 
      through: 'atuacoes',
      as: 'tiposPerfis',
      foreignKey: 'usuario_id'
    });
  }
}

module.exports = Usuario;