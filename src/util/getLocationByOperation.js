const Municipio = require('../models/Municipio');
const RegionalSaude = require('../models/RegionalSaude');
const LaboratorioMunicipio  = require( '../models/LaboratorioMunicipio' );
const RegionalMunicipio = require('../models/RegionalMunicipio');

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
        const laboratorio = await LaboratorioMunicipio.findOne({where:{laboratorio_id:at.local_id}})
        locais.laboratorio = laboratorio

        //encontra a regional cujo o municipio está vinculado
        const regionalMuni = await RegionalMunicipio.findOne({
          where:{
            municipio_id: laboratorio.dataValues.municipio_id,
            vinculado: true
          }
        })
        
        const muni = await Municipio.findByPk(laboratorio.dataValues.municipio_id, {attributes: [ 'id', 'nome', 'codigo' ]})
        locais.municipio = {...muni.dataValues}

        const regio = await RegionalSaude.findByPk(
          regionalMuni.regional_saude_id,
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
        )

        locais.municipio.regional = {...regio.dataValues}
        break;
    
      default:
        //encontra a regional cujo o municipio está vinculado
        const regionalMunicipio = await RegionalMunicipio.findOne({
          where:{
            municipio_id: at.local_id,
            vinculado: true
          }
        })
        
        const municipio = await Municipio.findByPk(at.local_id, {attributes: [ 'id', 'nome', 'codigo' ]})
        locais.municipio = {...municipio.dataValues}

        const regional = await RegionalSaude.findByPk(
          regionalMunicipio.regional_saude_id,
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
        )

        locais.municipio.regional = {...regional.dataValues}
        break;
    }
  }

  return locais;
}

