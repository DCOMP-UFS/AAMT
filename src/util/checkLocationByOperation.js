const Municipio = require('../models/Municipio');
const RegionalSaude = require('../models/RegionalSaude');

module.exports = async ( atuacoes ) => {
  let flValido = true;
  
  for (atuacao of atuacoes) {
    if( !flValido )
      break

    const { tipoPerfil, local_id } = atuacao;

    switch ( tipoPerfil ) {
      case 1:
        result = await RegionalSaude.findByPk( local_id );

        if( !result ) 
          flValido = false;

        break;
      case 5:
        break;
    
      default:
        result = await Municipio.findByPk( local_id );

        if( !result ) 
          flValido = false;

        break;
    }
  }

  return flValido;
}