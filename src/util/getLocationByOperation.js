const Municipio = require('../models/Municipio');
const RegionalSaude = require('../models/RegionalSaude');

module.exports = async ( atuacoes ) => {
  let locais = {};
  
  for (atuacao of atuacoes) {
    const at = atuacao.dataValues;

    switch ( at.escopo ) {
      case 1:
        locais.regionalSaude =  await RegionalSaude.findByPk( 
          at.local_id, 
          { attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
        );
        break;
      case 3:
        break;
    
      default:
        locais.municipio =  await Municipio.findByPk( 
          at.local_id, 
          { attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
        );
        break;
    }
  }

  return locais;
}

