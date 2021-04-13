const Quarteirao          = require('../models/Quarteirao');
const TrabalhoDiario      = require('../models/TrabalhoDiario');
const Vistoria            = require('../models/Vistoria');
const Estrato             = require('../models/Estrato');
const SituacaoQuarteirao  = require('../models/SituacaoQuarteirao');

const { Op } = require('sequelize');

module.exports = async trabalho_diario_id => {
  // Seleciona a atividade associada ao trabalho diário
  const trabalho = await TrabalhoDiario.findOne({
    where: {
      id: trabalho_diario_id,
    }, 
    include: [
      {
        association: 'equipe',
        attributes: [ 'id', 'atividade_id' ],
      }
    ],
  });

  if( !trabalho )
    return;

  const { atividade_id } = trabalho.equipe;

  // Selecion a quantidade de imóveis nos 
  // quarteirões trabalhados
  let sql_quarteiroes = 
    'SELECT ' +
      'l.quarteirao_id, ' +
      'count( l.* ) ' +
    'FROM ' +
      'trabalhos_diarios as td ' +
      'JOIN equipes as e ON (td.equipe_id = e.id) ' +
      'JOIN rotas as r ON (r.trabalho_diario_id = td.id) ' +
      'JOIN lados as l ON (l.id = r.lado_id) ' +
      'JOIN imoveis as i ON (i.lado_id = l.id) ' +
    'WHERE ' +
      'td.id = ' + trabalho_diario_id +
    ' GROUP BY ' +
      'l.quarteirao_id';

  const quarteiroes = await Quarteirao.sequelize.query( sql_quarteiroes );

  const quarteiroes_trabalhados = quarteiroes[ 1 ].rows.map( ({ quarteirao_id }) => quarteirao_id );

  // Seleciona o estrato
  const estrato = await Estrato.findOne({
    where: {
      atividade_id,
    },
    attributes: [ 'id' ]
  });

  // Seleciona a situação dos quarteirões
  let sql_situacao = 
    'SELECT * FROM '  + 
      'situacao_quarteiroes as sq ' +
    'WHERE ' +
      'sq.quarteirao_id IN ' + '(' + quarteiroes_trabalhados + ') ' +
      `AND sq.estrato_id = ${estrato.id}`

  let situacao_quarteirao = await SituacaoQuarteirao.sequelize.query( sql_situacao ).then(data => {
    const [ rows ] = data;
    return rows;
  });

  // Seleciona as vistorias trabalhadas nos 
  // quarteirões indicados.
  let sql_vistoria = 
    'SELECT ' + 
      'l.quarteirao_id, ' +
      'count( v.* ) ' +
    'FROM ' +
      'vistorias as v ' + 
      'JOIN trabalhos_diarios as td ON (v.trabalho_diario_id = td.id) ' +
      'JOIN equipes as eq ON (td.equipe_id = eq.id) ' +
      'JOIN atividades as atv ON (eq.atividade_id = atv.id) ' +
      'JOIN imoveis as i ON (v.imovel_id = i.id) ' +
      'JOIN lados as l ON (i.lado_id = l.id) ' +
    'WHERE ' +
      `atv.id = ${atividade_id} ` + 'AND ' + 
      'v.pendencia IS NULL ' + 'AND ' +
      'l.quarteirao_id IN ' + '(' + quarteiroes_trabalhados + ') ' +
    'GROUP BY ' +
      'l.quarteirao_id';

  const vistorias = await Vistoria.sequelize.query(
    sql_vistoria, 
  );

  const totalImoveisQuarteirao    = quarteiroes[ 1 ].rows;
  const totalVistoriasQuarteirao  = vistorias[ 1 ].rows;

  /*
      Compara a quantidade de imóveis do quarteirão com a
      quantidade de vistorias realizadas neles durante a atividade.
      Para cada caso, atualiza a situação do quarteirão.
  */
  const promises = totalImoveisQuarteirao.map(async q => {
    const v = totalVistoriasQuarteirao.find(p => p.quarteirao_id === q.quarteirao_id);
    const s = situacao_quarteirao.find(p => p.quarteirao_id === q.quarteirao_id);

    if( v && s ) {
      // Quarteirão em "aberto" -> "fazendo"
      if( parseInt( v.count ) < parseInt( q.count ) && parseInt( s.situacao_quarteirao_id ) === 1 ) {
        await SituacaoQuarteirao.update(
          {
            situacaoQuarteiraoId: 2,
          },
          {
            where: {
              id: s.id
            }
          }
        );
      }

      // Quarteirão completo
      if( parseInt( v.count ) === parseInt( q.count ) && parseInt( s.situacao_quarteirao_id ) !== 3 ) {
        await SituacaoQuarteirao.update(
          {
            situacaoQuarteiraoId: 3,
            dataConclusao: new Date()
          },
          {
            where: {
              id: s.id
            }
          }
        );
      }
    }
  });

  return (async () => {
    await Promise.all( promises );
  })();
}