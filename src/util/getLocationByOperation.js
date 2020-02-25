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
          { 
            attributes: [ 'id', 'nome' ],
            include: {
              association: 'estado',
              attributes: [ 'id', 'nome' ],
              include: {
                association: 'regiao',
                attributes: [ 'id', 'nome', 'sigla' ],
                include: {
                  association: 'pais',
                  attributes: [ 'id', 'nome', 'sigla' ]
                }
              }
            }
          }
        );
        break;
      case 3:
        break;
    
      default:
        locais.municipio =  await Municipio.findByPk( 
          at.local_id, 
          { 
            include: { 
              association: 'regional',
              attributes: [ 'id', 'nome' ],
              include: {
                association: 'estado',
                attributes: [ 'id', 'nome' ],
                include: {
                  association: 'regiao',
                  attributes: [ 'id', 'nome', 'sigla' ],
                  include: {
                    association: 'pais',
                    attributes: [ 'id', 'nome', 'sigla' ]
                  }
                }
              }
            },
            attributes: [ 'id', 'nome', 'codigo' ],
          }
        );
        break;
    }
  }

  return locais;
}

