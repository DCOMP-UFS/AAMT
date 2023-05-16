const { Model, DataTypes } = require('sequelize');

class Quarteirao extends Model {
  static init(sequelize) {
    super.init({
      numero: DataTypes.INTEGER,
      sequencia: DataTypes.INTEGER,
      ativo: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'quarteiroes'
    });
  }

  static associate( models ) {
    this.belongsTo( models.Quarteirao, { foreignKey: 'quarteirao_id', as: 'quarteirao' } );
    this.hasMany( models.Quarteirao, { foreignKey: 'quarteirao_id', as: 'quarteiroes' } );
    this.belongsTo( models.Zona, { foreignKey: 'zona_id', as: 'zona' } );
    this.belongsTo( models.Localidade, { foreignKey: 'localidade_id', as: 'localidade' } );
    this.hasMany( models.Lado, { foreignKey: 'quarteirao_id', as: 'lados' } );
    this.hasMany( models.SituacaoQuarteirao, { foreignKey: 'quarteirao_id', as: 'situacoes' } );
    this.belongsToMany( models.Equipe, {
      through: 'equipes_quarteiroes',
      as: 'equipes',
      foreignKey: 'quarteirao_id'
    });
    this.belongsToMany( models.Estrato, {
      through: 'situacao_quarteiroes',
      as: 'estrato',
      foreignKey: 'quarteirao_id'
    });
  }
}

module.exports = Quarteirao;