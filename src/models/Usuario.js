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
      tipoPerfil: DataTypes.STRING,
      ativo: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate( models ) {
    this.belongsTo( models.Municipio, { foreignKey: 'municipio_id', as: 'municipio' } );
  }
}

module.exports = Usuario;