const Usuario = require('../models/Usuario');

module.exports = async ( municipios, regionalSaude ) => {
  let usuarios = [];
  for (const municipio of municipios) {
    const { id } = municipio.dataValues;
    
    let result = await Usuario.findAll({
      include: {
        association: 'atuacoes',
        where: {
          escopo: 2,
          local_id: id
        }
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