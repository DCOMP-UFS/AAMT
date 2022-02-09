'use strict';

module.exports = {
  up: async ( queryInterface, Sequelize ) => {
    return Promise.all( [ 
      queryInterface.removeColumn( 'usuarios', 'rg' ),
    ] );
  },

  down: async ( queryInterface, Sequelize ) => {
    return Promise.all( [ 
      queryInterface.addColumn( 'usuarios', 'rg', {
        type: Sequelize.STRING,
        allawNull: false,
      } ),
    ] );
  }
};
