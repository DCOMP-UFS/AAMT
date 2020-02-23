const Permissao = require('../models/Permissao');

module.exports = async ( atuacoes ) => {
  const tipoPerfil = atuacoes.map( at => (at.tipoPerfil));

  let where = "WHERE ";
  tipoPerfil.forEach( (tp, index) => {
    if( index < tipoPerfil.length - 1 ){
      where += `tipo_perfil = $${ index + 1 } OR `;
    }else {
      where += `tipo_perfil = $${ index + 1 } `;
    }
  });

  const [ permissoes ] = await Permissao.sequelize.query(
    'SELECT DISTINCT ON( f.nome ) ' +
      'f.id, ' +
      'f.nome ' +
    'FROM ' +
      'permissoes AS p ' +
      'JOIN funcoes AS f ON( p.funcao_id = f.id ) ' +
    where +
    'ORDER BY nome ', 
    {
      bind: tipoPerfil,
      logging: console.log,
      plain: false
    }
  );

  return permissoes;
}