const Usuario = require('../models/Usuario');
const LaboratorioMunicipio  = require( '../models/LaboratorioMunicipio' );
const { Op }                = require( 'sequelize' );

module.exports = async ( municipios, regionalSaude, incluirLaboratoristas ) => {
  let usuarios = [];
  for (const municipio of municipios) {
    const { id } = municipio.dataValues;

    var labsId = [-1]
    if(incluirLaboratoristas == '1'){
      const laboratorios = await LaboratorioMunicipio.findAll( { where: { municipio_id : id } });
      labsId = laboratorios.map(lab => lab.id )
    }
    
    let result = await Usuario.findAll({
      include: {
        association: 'atuacoes',
        where: {
          [Op.or]:[
            { escopo: 2, local_id: id },
            { escopo: 3, local_id: { [Op.in]: labsId} }
          ]
          
        },
      }
    });

    result = result.map( usuario => {
      const u = usuario.dataValues;
      return { ...u, senha: undefined, municipio };
    });

    usuarios = [ ...usuarios, ...result];
  }

  let result = await Usuario.findAll({
    include: {
      association: 'atuacoes',
      where: {
        escopo: 1,
        local_id: regionalSaude.id
      }
    }
  });
  
  result = result.map( usuario => {
    const u = usuario.dataValues;
    return { ...u, senha: undefined, regionalSaude };
  });

  usuarios = [ ...usuarios, ...result ];
  
  return usuarios;
}