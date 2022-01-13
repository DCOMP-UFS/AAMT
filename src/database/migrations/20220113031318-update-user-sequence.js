'use strict';
const { Op } = require( 'sequelize' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "UPDATE atuacoes SET sequencia_usuario = 3 WHERE usuario_id = 2;" +
      "UPDATE atuacoes SET sequencia_usuario = 4 WHERE usuario_id = 3;" +
      "UPDATE atuacoes SET sequencia_usuario = 2 WHERE usuario_id = 6;" +
      "UPDATE atuacoes SET sequencia_usuario = 3 WHERE usuario_id = 7;"
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "UPDATE atuacoes SET sequencia_usuario = NULL WHERE usuario_id = 2;" +
      "UPDATE atuacoes SET sequencia_usuario = NULL WHERE usuario_id = 3;" +
      "UPDATE atuacoes SET sequencia_usuario = NULL WHERE usuario_id = 6;" +
      "UPDATE atuacoes SET sequencia_usuario = NULL WHERE usuario_id = 7;"
    );
  }
};
