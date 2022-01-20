'use strict';
const { Op } = require( 'sequelize' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "UPDATE funcoes SET nome = 'realizar_exame_amostra' WHERE nome = 'realizar_exame';"
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "UPDATE funcoes SET nome = 'realizar_exame' WHERE nome = 'realizar_exame_amostra';"
    );
  }
};
