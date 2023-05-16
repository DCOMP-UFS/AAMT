const Quarteirao          = require('../models/Quarteirao');
const TrabalhoDiario      = require('../models/TrabalhoDiario');
const Vistoria            = require('../models/Vistoria');
const Estrato             = require('../models/Estrato');
const SituacaoQuarteirao  = require('../models/SituacaoQuarteirao');
const EquipeQuarteirao    = require('../models/EquipeQuarteirao')

const { Op } = require('sequelize');
const Lado = require('../models/Lado');

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

  const { atividade_id, id: equipe_id } = trabalho.equipe;

  const quarteiroes_da_equipe = await EquipeQuarteirao.findAll({
    where: {
      equipe_id
    }
  })

  //Irá contem os ids de todos os quarteiroes que a equipe é responsavel
  var lista_quarteiroes_id = []
  quarteiroes_da_equipe.forEach( q => lista_quarteiroes_id.push(q.quarteirao_id))

  //Query que irá encontra o estrato sob resposabilidade da equipe que fez o trabalho diario, que é justamente o estrato que contem 
  //todos os quarteirões que estão na lista_quarteiroes_id.
  //Como em uma atividade, cada equipe é responsavel por um estrato, está query só irá retorna o id de um estrato.
  const sql_estrato_equipe = 
    'SELECT '+ 
      's.estrato_id '+ 
    'FROM '+ 
      'situacao_quarteiroes as s '+
      'JOIN estratos as e ON(s.estrato_id = e.id) '+
    'WHERE '+ 
      'e.atividade_id = '+atividade_id+" "+ 
      'AND s.quarteirao_id IN '+'(' +lista_quarteiroes_id+ ') '+
    'GROUP BY s.estrato_id '+
    'HAVING COUNT(*) = '+lista_quarteiroes_id.length;

  const estrato_equipe = await SituacaoQuarteirao.sequelize.query( sql_estrato_equipe );
  const estrato_id = await estrato_equipe[ 1 ].rows[0].estrato_id

  // Seleciona o estrato
  const estrato = await Estrato.findByPk(estrato_id)


  for( let quarteirao_id of lista_quarteiroes_id){

    //Acha todos os lados do quarteirao e diz quantos imoveis cada um tem
    let sql_lados_quarteirao = 
    'SELECT ' +
      ' l.id, '+
      ' count( i.*) as qtd_imoveis '+
    'FROM lados as l '+
    'JOIN quarteiroes as q ON (q.id = l.quarteirao_id) '+
    'JOIN imoveis as i ON (i.lado_id = l.id) '+
    'WHERE i.tipo_imovel != 4 '+
    'AND q.id = '+quarteirao_id+' '+
    'GROUP BY l.id';

    const lados_imoveis = await Lado.sequelize.query( sql_lados_quarteirao )
    const lados_imoveis_map = lados_imoveis[ 1 ].rows.map( l => ({id:l.id, qtdImoveis: l.qtd_imoveis}) );

    //Acha todos os lados do quarteirao e diz quantos quantas vistorias foram feitas cada um
    let sql_lados_vistorias = 
    'SELECT ' +
      ' l.id, '+
      ' count( v.*) as qtd_vistorias '+
    'FROM lados as l '+
    'JOIN quarteiroes as q ON (q.id = l.quarteirao_id) '+
    'JOIN imoveis as i ON (i.lado_id = l.id) '+
    'JOIN vistorias as v ON (v.imovel_id = i.id) '+
    'JOIN trabalhos_diarios as td ON (v.trabalho_diario_id = td.id) ' +
    'JOIN equipes as eq ON (td.equipe_id = eq.id) ' +
    'JOIN atividades as atv ON (eq.atividade_id = atv.id) ' +
    'WHERE i.tipo_imovel != 4 '+
    'AND q.id = '+quarteirao_id+ ' '+
    'AND atv.id = '+atividade_id+' '+
    'AND v.pendencia IS NULL '+
    'GROUP BY l.id';

    const lados_vistorias = await Lado.sequelize.query( sql_lados_vistorias )
    const lados_vistorias_map = lados_vistorias[ 1 ].rows.map( l => ({id:l.id, qtdVistorias: l.qtd_vistorias}) );

    //Encontra o id da situação do quarteirao
    let sql_situacao = 
   'SELECT sq.id FROM '  + 
     'situacao_quarteiroes as sq ' +
   'WHERE ' +
     'sq.quarteirao_id = '+ quarteirao_id+' '+
     `AND sq.estrato_id = ${estrato.id}`

    let situacao_quarteirao = await SituacaoQuarteirao.sequelize.query( sql_situacao )
    let situacao_quarteirao_id = situacao_quarteirao[ 1 ].rows[0].id

    //Significa que não houve uma unica vistoria neste quarteirão
    //Logo a situação deste quartirão é aberta (1)
    if(lados_vistorias_map.length == 0){
      await SituacaoQuarteirao.update(
        {
          situacaoQuarteiraoId: 1,
        },
        {
          where: {
            id: situacao_quarteirao_id
          }
        }
      );
    }

    else{
      //indica se o quarteirão está concluido ou não
      let quarteiraoConcluido = true
      for( let ladoImovel of lados_imoveis_map){
        
        const ladoVistoria = lados_vistorias_map.find( lv => lv.id == ladoImovel.id)

        //Significa que este lado do quarteirão não possui vistoria.
        //Logo não tem como o quarteirão ter sido concluido
        if(!ladoVistoria){
          quarteiraoConcluido = false
          break;
        }
        else{
          const qtdImoveisLado = ladoImovel.qtdImoveis
          const qtdVistoriasLado = ladoVistoria.qtdVistorias

          const imovelExcedente = qtdImoveisLado % 5 > 0 ? 1 : 0

          //Variavel que armazena a quantidade de imoveis que devem ser vistorados, para que o lado
          //seja considerado com situação concluida
          const numeroImoveisNecessarios = Math.floor(qtdImoveisLado / 5) + imovelExcedente

          //Siginifica que este lado do quarteirão ainda não foi concluido.
          //Logo este quarteirão tambem não foi concluido
          if(qtdVistoriasLado < numeroImoveisNecessarios){
            quarteiraoConcluido = false
            break;
          }
        }
      }

      if(quarteiraoConcluido){
        await SituacaoQuarteirao.update(
          {
            situacaoQuarteiraoId: 3, //CONCLUINDO
          },
          {
            where: {
              id: situacao_quarteirao_id
            }
          }
        );
      }
      else{
        console.log("----------------------")
        console.log("fazendo")
        console.log("----------------------")
        await SituacaoQuarteirao.update(
          {
            situacaoQuarteiraoId: 2, //FAZENDO
          },
          {
            where: {
              id: situacao_quarteirao_id
            }
          }
        );
      }
    }

  }

  

  /* // Selecion a quantidade de imóveis nos 
  // quarteirões trabalhados
  let sql_quarteiroes = 
    'SELECT ' +
      'qt.quarteirao_id, '+
      'count( i.* ) '+
    'FROM ( ' +
      'SELECT DISTINCT q.id as quarteirao_id '+
      'FROM trabalhos_diarios as td '+
      'JOIN equipes as e ON (td.equipe_id = e.id) '+
      'JOIN rotas as r ON (r.trabalho_diario_id = td.id) '+
      'JOIN lados as l ON (l.id = r.lado_id) '+
      'JOIN quarteiroes as q ON (q.id = l.quarteirao_id) '+
      ' WHERE td.id = '+ trabalho_diario_id+' '+
    ') AS qt '+
    'JOIN lados as l ON (l.quarteirao_id = qt.quarteirao_id) '+
    'JOIN imoveis as i ON (i.lado_id = l.id) '+
    'WHERE i.tipo_imovel != 4 '+
    'GROUP BY qt.quarteirao_id';

  const quarteiroes = await Quarteirao.sequelize.query( sql_quarteiroes );

  const quarteiroes_trabalhados = quarteiroes[ 1 ].rows.map( ({ quarteirao_id }) => quarteirao_id );

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

  //Contabiliza o numero de imoveis vistoriados com sucesso atraves do numero de vistorias sem pendencia
  //A query informa o numero de imoveis por quarteirao trabalhado
  let sql_imoveis_sem_pendencia = 
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

  const imoveis_sem_pendencia = await Vistoria.sequelize.query(
    sql_imoveis_sem_pendencia, 
  );


  const totalImoveisQuarteirao    = quarteiroes[ 1 ].rows;
  const totalImoveisSemPendenciaQuarteirao  = imoveis_sem_pendencia[ 1 ].rows; */

  /*
      Compara a quantidade de imóveis do quarteirão com a
      quantidade de vistorias realizadas neles durante a atividade.
      Para cada caso, atualiza a situação do quarteirão.
  */
  /* const promises = totalImoveisQuarteirao.map(async q => {
    const v = totalImoveisSemPendenciaQuarteirao.find(p => p.quarteirao_id === q.quarteirao_id);
    const s = situacao_quarteirao.find(p => p.quarteirao_id === q.quarteirao_id);

    //Significa que no quarteirao existem tanto imoveis com vistorias pendentes quando imoveis com vistoria sem pendencia
    if( v && s ) {
      // Quarteirão em "aberto" -> "fazendo"
      if( parseInt( v.count ) + parseInt( vp.count ) < parseInt( q.count ) && parseInt( s.situacao_quarteirao_id ) === 1 ) {
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
      // Quarteirão concluido com pendencia
      if( parseInt( v.count ) + parseInt( vp.count ) === parseInt( q.count ) && parseInt( s.situacao_quarteirao_id ) !== 4 ) {
        await SituacaoQuarteirao.update(
          {
            situacaoQuarteiraoId: 4,
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
    //Significa que no quarteirao existe apenas imoveis com vistorias sem pendencia
    else if(v && !vp && s ){
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

      // Quarteirão concluido
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
    //Significa que no quarteirao existe apenas imoveis com vistorias com pendencia
    else if(!v && vp && s ){
      // Quarteirão em "aberto" -> "fazendo"
      if( parseInt( vp.count ) < parseInt( q.count ) && parseInt( s.situacao_quarteirao_id ) === 1 ) {
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

      // Quarteirão concluido com pendencia
      if( parseInt( vp.count ) === parseInt( q.count ) && parseInt( s.situacao_quarteirao_id ) !== 4 ) {
        await SituacaoQuarteirao.update(
          {
            situacaoQuarteiraoId: 4,
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
    
  }); */

  /* return (async () => {
    await Promise.all( promises );
  })(); */
}