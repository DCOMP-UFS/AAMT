const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Atividade = require('../models/Atividade');
const Ciclo = require('../models/Ciclo');
const Quarteirao = require('../models/Quarteirao');
const Equipe = require('../models/Equipe');
const Usuario = require('../models/Usuario');
const TrabalhoDiario = require('../models/TrabalhoDiario');
const SituacaoQuarteirao = require('../models/SituacaoQuarteirao');
const Rota = require('../models/Rota');

const getEpiWeek = require('../util/getEpiWeek');
const allowFunction = require('../util/allowFunction');

const { format, parseISO } = require('date-fns');

const router = express.Router();
router.use(authMiddleware);

getTeamDailyActivity = async (req, res) => {
	const { equipe_id, dia } = req.params;

	let trabalhos = await TrabalhoDiario.findAll({
		where: {
			equipe_id,
			data: dia,
		}, 
		include: [
			{
				association: 'vistorias',
				attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
				include: [
					{
						association: 'depositos',
						attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
						include: [
							{
								association: 'tratamentos',
								attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
							},
							{
								association: 'amostras',
								attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
							}
						]
					},
					{
						association: 'imovel',
						attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
					}
				]
			},
			{
				association: 'usuario', 
				attributes: [ "id", "nome" ],
			},
			{
				association: 'rota',
				attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
				include: [
					{
						association: 'imoveis',
					}
				]
			}
		]
	});

	if( !trabalhos )
		return res.status( 200 ).json( [] );

	let imoveisFechados 			= 0,
			imoveisRecusados 			= 0,
			vistoriaNormal 				= 0,
			vistoriaRecuperada 		= 0,
			totalImoveisVisitados = 0,
			totalAmostras 				= 0,
			amostrasColetadas 		= 0,
			amostrasPendentes 		= 0,
			amostrasExaminadas 		= 0,
			imoveisPlanejados 		= 0,
			totalImoveisAgente 		= [],
			imoveisTrabalhados 		= [],
			imoveisTipo 					= {
				residencial: 0,
				terrenoBaldio: 0,
				comercial: 0,
				pontoEstrategico: 0
			};

	trabalhos.map( trabalho => {
		const vistorias = trabalho.vistorias,
					rotas 		= trabalho.rota;

		totalImoveisVisitados += vistorias.length;

		const index = totalImoveisAgente.findIndex( p => p.usuario.id === trabalho.usuario.id );

		if( index >= 0 ) {
			imoveisPorAgente[ index ].imoveisVistoriados += vistorias.length;
		} else {
			const imoveisPorAgente = {
				usuario: trabalho.usuario,
				imoveisVistoriados: vistorias.length,
			}

			totalImoveisAgente.push( imoveisPorAgente );
		}

		rotas.map( rota => { imoveisPlanejados += rota.imoveis.length; } );

		vistorias.map(vistoria => {
			const depositos = vistoria.depositos;

			switch( vistoria.imovel.tipoImovel ) {
				case 1: // Residencial
					imoveisTipo.residencial += 1;
					break;
				case 2: // Terreno Baldio
					imoveisTipo.terrenoBaldio += 1;
					break;
				case 3: // Comercial
					imoveisTipo.comercial += 1;
					break;
			
				default: // Ponto Estratégico
					imoveisTipo.pontoEstrategico += 1;
					break;
			}

			switch( vistoria.pendencia ) {
				case "R": 
					imoveisRecusados++;
					break;
				case "F":
					imoveisFechados++;
					break;
				case null:
					break;
				default:
					break;
			}

			switch( vistoria.situacaoVistoria ) {
				case "R": 
					vistoriaRecuperada++;
					break;
				case "N":
					vistoriaNormal++;
					break;
				default:
					break;
			}

			depositos.map( deposito => {
				const amostras = deposito.amostras;

				amostras.map( amostra => {
					totalAmostras++;

					switch( amostra.situacaoAmostra ) {
						case 1:
							amostrasColetadas++;
							break;
						case 2:
							amostrasPendentes++;
							break;
						case 3:
							amostrasExaminadas++;
							break;
					}
				});
			});
		});
	});

	const resultado = {
		amostras: {
			total: totalAmostras,
			coletadas: amostrasColetadas,
			pendentes: amostrasPendentes,
			examinadas: amostrasExaminadas,
		},
		imoveis: {
			totalVistoriado: totalImoveisVisitados,
			naoVistoriados: imoveisPlanejados - totalImoveisVisitados,
			fechados: imoveisFechados,
			recusados: imoveisRecusados,
			vistoriaNormal,
			vistoriaRecuperada,
		},
		imoveisTipo,
		vistoriasPorAgentes: totalImoveisAgente,
	}

	return res.json( resultado );
}

getActivityWeeklyReport = async (req, res) => {
    const { atividade_id, ano, semana } = req.query;
    const userId = req.userId;

    // Validação da rota

    const user_request = await Usuario.findByPk( userId );

    const allow = await allowFunction( user_request.id, 'definir_trabalho_diario' );
		if( !allow )
			return res.status(403).json({ error: 'Acesso negado' });

    const semanaEpidemiologica = getEpiWeek( semana, ano );

    // O número máximo de semanas em um ano é 53, em situações específicas
    if( semanaEpidemiologica === -1 )
      return res.status( 400 ).json( { error: `Este ano não possui ${ semana } semanas epidemiológicas` } );

    const [ data_inicio, data_fim ] = semanaEpidemiologica;

    // Selecionando todas as equipes da atividade
    let equipes = await Equipe.findAll({
      where: {
        atividade_id
      },
      attributes: [ 'id' ]
    });

    equipes = equipes.map(({ id }) => id);

    // Selecionando todas as vistorias realizadas pelas equipes
    let trabalhos = await TrabalhoDiario.findAll({
      where: {
        equipe_id: {
          [Op.in]: equipes
        },
        data: {
          [Op.between]: [data_inicio, data_fim]
        }
      }, 
      include: [
        {
          association: 'vistorias',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          include: [
            {
              association: 'depositos',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              include: [
                {
                  association: 'tratamentos',
                  attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                },
                {
                  association: 'amostras',
                  attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                  include: [
                    {
                      association: 'exemplares',
                      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                      include: [
                        {
                          association: 'mosquito',
                          attributes: { include: [ 'nome' ], exclude: [ 'createdAt', 'updatedAt' ] },
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              association: 'imovel',
              attributes: ['tipoImovel']
            }
          ]
        },
      ]
    });
  
    // Contabilizando quantos agentes trabalharam na semana
    let numberAgents = await TrabalhoDiario.findAll({
      where: {
        equipe_id: {
          [Op.in]: equipes
        },
        data: {
          [Op.between]: [data_inicio, data_fim]
        }
      },
      attributes: [ 'usuario_id' ]
    }).then( trabalho => {
      let users = [];

      trabalho.forEach( t => {
        if( !users.includes( t.usuario_id ) )
          users.push( t.usuario_id )
      });

      return users.length;
    });

    if( trabalhos.length === 0 )
      return res.json( [] );

    let propertiesByType = [
      { label: 'Residencial', sigla: 'R', value: 0 },
      { label: 'Terreno Baldio', sigla: 'TB', value: 0 },
      { label: 'Comercial', sigla: 'C', value: 0 },
      { label: 'Ponto Estratégico', sigla: 'PE', value: 0 },
      { label: 'Total', sigla: 'T', value: 0 },
    ];
    
    let propertiesByStatus = [
      { label: 'Normal', value: 0 },
      { label: 'Recuperado', value: 0 },
    ];

    let properties = [
      { label: 'Inspecionada', value: 0 },
      { label: 'Tratada', value: 0 }
    ];

    let depositTreated = [
      { label: 'Larvicida', sigla: 'T', value: 'TEMEPHÓS' },
      { label: 'Gramas', value: 0 },
      { label: 'Dep. Tratados', value: 0 },
    ];

    let propertiesByPendency = [
      { label: 'Fechado', value: 0 },
      { label: 'Recusado', value: 0 },
      { label: 'Nenhuma', value: 0 },
    ];

    let recipientsByType = [
      { label: 'A1', value: 0 },
      { label: 'A2', value: 0 },
      { label: 'B', value: 0 },
      { label: 'C', value: 0 },
      { label: 'D1', value: 0 },
      { label: 'D2', value: 0 },
      { label: 'E', value: 0 },
    ];

    let recipientDestination = [
        { label: 'Eliminado', value: 0 },
        { label: 'Tratado', value: 0 },
    ];

    let sampleByProperty = [
      { 
        label: 'Residência', 
        sigla: 'R',
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 },
          { label: 'Outros', value: 0 }
        ] 
      },
      { 
        label: 'Comércio', 
        sigla: 'C',
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 },
          { label: 'Outros', value: 0 }
        ] 
      },
      { 
        label: 'Terreno Baldio', 
        sigla: 'TB',
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 },
          { label: 'Outros', value: 0 }
        ] 
      },
      { 
        label: 'Ponto Estratégico', 
        sigla: 'PE',
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 },
          { label: 'Outros', value: 0 }
        ] 
      }
    ];

    let sampleByDeposit = [
      { 
        label: 'A1', 
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 }
        ] 
      },
      { 
        label: 'A2', 
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 }
        ] 
      },
      { 
        label: 'B', 
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 }
        ] 
      },
      { 
        label: 'C', 
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 }
        ] 
      },
      { 
        label: 'D1', 
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 }
        ] 
      },
      { 
        label: 'D2', 
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 }
        ] 
      },
      { 
        label: 'E', 
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 }
        ] 
      },
    ]

    let sampleExemplary = [
      {
        label: 'Ovo',
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 },
          { label: 'Outros', value: 0 }
        ]
      },
      {
        label: 'Pupa',
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 },
          { label: 'Outros', value: 0 }
        ]
      },
      {
        label: 'Exúvia de pupa',
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 },
          { label: 'Outros', value: 0 }
        ]
      },
      {
        label: 'Larva',
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 },
          { label: 'Outros', value: 0 }
        ]
      },
      {
        label: 'Adulto',
        value: [
          { label: 'Aedes aegypti', value: 0 },
          { label: 'Aedes albopictus', value: 0 },
          { label: 'Outros', value: 0 }
        ]
      },
    ]

    let totalSample = 0;

    // Gerando os indíces do relatório

    trabalhos.map(trabalho => {
      const vistorias = trabalho.vistorias;

      propertiesByType[ 4 ].value += vistorias.length;
      vistorias.map(vistoria => {
        const depositos = vistoria.depositos;

        switch (vistoria.situacaoVistoria) {
          case 'N':
            propertiesByStatus[0].value++;
            break;
          case 'R':
            propertiesByStatus[1].value++;
            break;
        }

        switch (vistoria.pendencia) {
          case 'F':
            propertiesByPendency[0].value++;
            break;
          case 'R':
            propertiesByPendency[0].value++;
            break;
          case null:
            propertiesByPendency[2].value++;
            break;
        }

        switch (vistoria.imovel.tipoImovel) {
          case 1:
            propertiesByType[0].value++;
            break;
          case 2:
            propertiesByType[1].value++;
            break; 
          case 3:
            propertiesByType[2].value++;
            break;
          case 4:
            propertiesByType[3].value++;
            break;   
        }

        // Somando imóveis inspecionados
        if( depositos.length > 0 )
          properties[ 0 ].value++;

        let property_is_trated          = false,
            property_contain_aegypti    = false,
            property_contain_albopictus = false,
            property_contain_other      = false;

        depositos.map(deposito => {
          switch (deposito.tipoRecipiente) {
            case 'A1':
              recipientsByType[0].value++;
              break;
            case 'A2':
              recipientsByType[1].value++;
              break; 
            case 'B':
              recipientsByType[2].value++;
              break;
            case 'C':
              recipientsByType[3].value++;
              break; 
            case 'D1':
              recipientsByType[4].value++;
              break;
            case 'D2':
              recipientsByType[5].value++;
              break; 
            case 'E':
              recipientsByType[6].value++;
              break;      
          }

          if( deposito.fl_eliminado )
            recipientDestination[0].value++;

          if( deposito.fl_tratado ) {
            recipientDestination[1].value++;

            // Contabilizando recipiente tratado e somando gastos de larvicida
            depositTreated[ 1 ].value += deposito.tratamentos.reduce( ( accumulator, currentValue ) => accumulator + currentValue.quantidade, 0 );
            depositTreated[ 2 ].value++;

            // Setando imóvel como tratado
            property_is_trated = true;
          }

          totalSample += deposito.amostras.length;
          deposito.amostras.map( amostra => {
            let aegypti     = amostra.exemplares.filter( exemplar => exemplar.mosquito.id === 1 ),
                albopictus  = amostra.exemplares.filter( exemplar => exemplar.mosquito.id === 2 ),
                other       = amostra.exemplares.filter( exemplar => exemplar.mosquito.id > 2 );

            // Checando se o imóvel deu posítivo para aegypti
            if( aegypti.length > 0 )
              property_contain_aegypti = true;

            // Checando se o imóvel deu posítivo para albopictus
            if( albopictus.length > 0 )
              property_contain_albopictus = true;

            // Checando se o imóvel deu posítivo para outros
            if( other.length > 0 )
              property_contain_other = true;

            // Preenchendo informações dos exemplares
            amostra.exemplares.forEach( exemplar => {
              switch( exemplar.fase ) {
                case 1: // Ovo
                  if( exemplar.mosquito_id === 1 )
                    sampleExemplary[ 0 ].value[ 0 ].value += exemplar.quantidade;

                  if( exemplar.mosquito_id === 2 )
                    sampleExemplary[ 0 ].value[ 1 ].value += exemplar.quantidade;

                  if( exemplar.mosquito_id > 2 )
                    sampleExemplary[ 0 ].value[ 2 ].value += exemplar.quantidade;
                  break;
                case 2: // Pupa
                  if( exemplar.mosquito_id === 1 )
                    sampleExemplary[ 1 ].value[ 0 ].value += exemplar.quantidade;

                  if( exemplar.mosquito_id === 2 )
                    sampleExemplary[ 1 ].value[ 1 ].value += exemplar.quantidade;

                  if( exemplar.mosquito_id > 2 )
                    sampleExemplary[ 1 ].value[ 2 ].value += exemplar.quantidade;
                  break;
                case 3: // Exúvia de pupa
                  if( exemplar.mosquito_id === 1 )
                    sampleExemplary[ 2 ].value[ 0 ].value += exemplar.quantidade;

                  if( exemplar.mosquito_id === 2 )
                    sampleExemplary[ 2 ].value[ 1 ].value += exemplar.quantidade;

                  if( exemplar.mosquito_id > 2 )
                    sampleExemplary[ 2 ].value[ 2 ].value += exemplar.quantidade;
                  break;
                case 4: // Larva
                  if( exemplar.mosquito_id === 1 )
                    sampleExemplary[ 3 ].value[ 0 ].value += exemplar.quantidade;

                  if( exemplar.mosquito_id === 2 )
                    sampleExemplary[ 3 ].value[ 1 ].value += exemplar.quantidade;

                  if( exemplar.mosquito_id > 2 )
                    sampleExemplary[ 3 ].value[ 2 ].value += exemplar.quantidade;
                  break;
                case 5: // Adulto
                  if( exemplar.mosquito_id === 1 )
                    sampleExemplary[ 4 ].value[ 0 ].value += exemplar.quantidade;

                  if( exemplar.mosquito_id === 2 )
                    sampleExemplary[ 4 ].value[ 1 ].value += exemplar.quantidade;

                  if( exemplar.mosquito_id > 2 )
                    sampleExemplary[ 4 ].value[ 2 ].value += exemplar.quantidade;
                  break;
              
                default:
                  break;
              }
            } );

            switch( deposito.tipoRecipiente ) {
              case 'A1':
                sampleByDeposit[ 0 ].value[ 0 ].value += aegypti.length > 0 ? 1 : 0;
                sampleByDeposit[ 0 ].value[ 1 ].value += albopictus.length > 0 ? 1 : 0;
                break;
              case 'A2':
                sampleByDeposit[ 1 ].value[ 0 ].value += aegypti.length > 0 ? 1 : 0;
                sampleByDeposit[ 1 ].value[ 1 ].value += albopictus.length > 0 ? 1 : 0;
                break; 
              case 'B':
                sampleByDeposit[ 2 ].value[ 0 ].value += aegypti.length > 0 ? 1 : 0;
                sampleByDeposit[ 2 ].value[ 1 ].value += albopictus.length > 0 ? 1 : 0;
                break;
              case 'C':
                sampleByDeposit[ 3 ].value[ 0 ].value += aegypti.length > 0 ? 1 : 0;
                sampleByDeposit[ 3 ].value[ 1 ].value += albopictus.length > 0 ? 1 : 0;
                break; 
              case 'D1':
                sampleByDeposit[ 4 ].value[ 0 ].value += aegypti.length > 0 ? 1 : 0;
                sampleByDeposit[ 4 ].value[ 1 ].value += albopictus.length > 0 ? 1 : 0;
                break;
              case 'D2':
                sampleByDeposit[ 5 ].value[ 0 ].value += aegypti.length > 0 ? 1 : 0;
                sampleByDeposit[ 5 ].value[ 1 ].value += albopictus.length > 0 ? 1 : 0;
                break; 
              case 'E':
                sampleByDeposit[ 6 ].value[ 0 ].value += aegypti.length > 0 ? 1 : 0;
                sampleByDeposit[ 6 ].value[ 1 ].value += albopictus.length > 0 ? 1 : 0;
                break;      
            }
          });
        })

        // Somando imóveis tratados
        if( property_is_trated )
          properties[ 1 ].value++;

        // Preenchendo resultados de laboratório por imóvel
        switch( vistoria.imovel.tipoImovel ) {
          case 1:
            // Somando imóveis positivos para aegypti
            if( property_contain_aegypti )
              sampleByProperty[ 0 ].value[ 0 ].value += 1;

            // Somando imóveis positivos para albopictus
            if( property_contain_albopictus )
              sampleByProperty[ 0 ].value[ 1 ].value += 1;

            // Somando imóveis positivos para outros
            if( property_contain_other )
              sampleByProperty[ 0 ].value[ 2 ].value += 1;

            break;
          case 2:
            // Somando imóveis positivos para aegypti
            if( property_contain_aegypti )
              sampleByProperty[ 1 ].value[ 0 ].value += 1;

            // Somando imóveis positivos para albopictus
            if( property_contain_albopictus )
              sampleByProperty[ 1 ].value[ 1 ].value += 1;

            // Somando imóveis positivos para outros
            if( property_contain_other )
              sampleByProperty[ 1 ].value[ 2 ].value += 1;

            break; 
          case 3:
            // Somando imóveis positivos para aegypti
            if( property_contain_aegypti )
              sampleByProperty[ 2 ].value[ 0 ].value += 1;

            // Somando imóveis positivos para albopictus
            if( property_contain_albopictus )
              sampleByProperty[ 2 ].value[ 1 ].value += 1;

            // Somando imóveis positivos para outros
            if( property_contain_other )
              sampleByProperty[ 2 ].value[ 2 ].value += 1;

            break;
          case 4:
            // Somando imóveis positivos para aegypti
            if( property_contain_aegypti )
              sampleByProperty[ 3 ].value[ 0 ].value += 1;

            // Somando imóveis positivos para albopictus
            if( property_contain_albopictus )
              sampleByProperty[ 3 ].value[ 1 ].value += 1;

            // Somando imóveis positivos para outros
            if( property_contain_other )
              sampleByProperty[ 3 ].value[ 2 ].value += 1;

            break;   
        }
      })
    });

    const resultado = {
      epiWeek: {
        semana,
        ano, 
        inicio: format(parseISO(data_inicio), 'dd-MM-yyyy'),
        fim: format(parseISO(data_fim), 'dd-MM-yyyy'),
        totalAgentes: numberAgents
      },
      propertiesByType,
      propertiesByStatus,
      propertiesByPendency,
      recipientsByType,
      recipientDestination,
      totalSample,
      properties,
      depositTreated,
      sampleByDeposit,
      sampleByProperty,
      sampleExemplary
    }

    return res.json(resultado)
}

getCurrentActivityReport = async ( req, res ) => {
    const { atividade_id }  = req.params;
    const userId            = req.userId; 

    // Validação da rota
    const user_request = await Usuario.findByPk( userId );

    const allow = await allowFunction( user_request.id, 'definir_trabalho_diario' );
        if( !allow )
            return res.status(403).json({ error: 'Acesso negado' });

    // Situação dos quarteirões + qtd de imóveis totais
    let sql_imoveis = 
        'SELECT ' + 
            'q.id, ' +
            'sq.situacao_quarteirao_id, ' +
            'count(i.*) as qtd_imoveis ' +
        'FROM ' + 
            'estratos AS est ' +
            'JOIN situacao_quarteiroes as sq ON (est.id = sq.estrato_id) ' +
            'JOIN quarteiroes as q ON (q.id = sq.quarteirao_id) ' +
            'JOIN lados as l ON (l.quarteirao_id = q.id) ' +
            'JOIN imoveis as i ON (i.lado_id = l.id) ' +
        'WHERE ' +
            `est.atividade_id = ${atividade_id} ` +
        'GROUP BY ' + 
            'q.id, sq.situacao_quarteirao_id';

    let situacao_quarteiroes = await Atividade.sequelize.query(sql_imoveis).then(data => {
        const [ rows ] = data;
        
        let aberto          = 0,
            fazendo         = 0,
            concluido       = 0,
            totalImoveis    = 0;

        rows.map(row => {
            switch(row.situacao_quarteirao_id) {
                case 1:
                    aberto++;
                    break;
                case 2:
                    fazendo++;
                    break;
                case 3:
                    concluido++;
                    break;
            }
            totalImoveis += parseInt(row.qtd_imoveis)
        });

        objeto = {
            aberto,
            fazendo,
            concluido,
            totalImoveis
        }

        return objeto;
    });

    // const totalImoveis = situacao_quarteiroes.reduce((total, quarteirao) => {
    //     return total + parseInt(quarteirao.qtd_imoveis)
    // }, 0);

    let equipes = await Equipe.findAll({
        where: {
            atividade_id
        },
        attributes: ['id']
    }).then(data => {
        return data.map(({ id }) => id)
    });

    let trabalhos = await TrabalhoDiario.findAll({
        where: {
            equipe_id: {
                [Op.in]: equipes
            },
        }, 
        include: [
            {
                association: 'vistorias',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                include: [
                    {
                        association: 'depositos',
                        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                        include: [
                          {
                            association: 'tratamentos',
                            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                          },
                          {
                            association: 'amostras',
                            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                          }
                        ]
                    },
                ]
            },
        ]
    });

    let imoveisRecusados = 0;
    let imoveisFechados = 0;
    let totalLarvicida = 0;
    let totalVistorias = 0;
    let totalAmostras = 0;
    let imoveisPositivos = 0;
    let imoveisNegativos = 0;
    let amostrasColetadas = 0;
    let amostrasPendentes = 0;
    let amostrasPositivas = 0;
    let amostrasNegativas = 0;

    trabalhos.map(trabalho => {
        const { vistorias } = trabalho;

        vistorias.map(vistoria => {
            switch(vistorias.pendencia) {
                case 'R':
                    imoveisRecusados++;
                    break;
                case 'F':
                    imoveisFechados++;
                    break;
                default:
                    break;
            }

            totalVistorias++;

            const { depositos } = vistoria;

            let imovelPositivo = false;
            let imovelNegativo = false;

            depositos.map(deposito => {
                const amostras = deposito.amostras;

                if (deposito.tratamentos[0]) {
                    totalLarvicida += deposito.tratamentos[0].quantidade;
                }


                amostras.map(amostra => {
                    totalAmostras++;

                    switch (amostra.situacaoAmostra) {
                        case 1:
                            amostrasColetadas++;
                            break;
                        case 2:
                            amostrasPendentes++;
                            break;
                        case 3:
                            amostrasPositivas++;
                            imovelPositivo = true;
                            break;
                        case 4:
                            amostrasNegativas++;
                            imovelNegativo = true;
                            break;
                    }
                })
            })

            if (imovelPositivo) {
                imoveisPositivos += 1;
            }
            if (imovelNegativo) {
                imoveisNegativos += 1;
            }
        });
    });

    const { totalImoveis } = situacao_quarteiroes;
    let percentualConclusao = totalVistorias/totalImoveis;

    const relatorio = {
        pendencia: {
            imoveisFechados,
            imoveisRecusados
        },
        amostras: {
            coletadas: amostrasColetadas,
            pendentes: amostrasPendentes,
            positivas: amostrasPositivas,
            negativas: amostrasNegativas,
        },
        imoveisPositivos,
        imoveisNegativos,
        situacao_quarteiroes,
        totalVistorias,
        percentualConclusao,
        totalLarvicida,
    }

    return res.json(relatorio);
}


/**
 * O supervisor pode ver o relatório da equipe para
 * toda a atividade ou ver por um dia específico
 */
getTeamActivityReport = async (req, res) => {
  const { equipe_id } = req.params;
  const { data, tipoRelatorio } = req.query;

  if (tipoRelatorio === 'diario' && !data) {
    return res.status(400).json({error: 'Você precisa informar uma data para o relatório diário'})
  };

  const filtroQuery = {
    equipe_id,
    ...(tipoRelatorio === 'diario' ? { data } : {}),
  };

  let trabalhos = await TrabalhoDiario.findAll({
    where: filtroQuery, 
    include: [
      {
        association: 'vistorias',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: [
          {
            association: 'depositos',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
            include: [
              {
                association: 'tratamentos',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              },
              {
                association: 'amostras',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              }
            ]
          },
        ]
      },
      {
        association: 'usuario', 
        attributes: ["id", "nome"],
      },
      {
        association: 'rota',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: [
          {
            association: 'imoveis',
          }
        ]
      }
    ]
  });

  if( !trabalhos )
    return res.status( 200 ).json( [] );

  let imoveisFechados = 0;
  let imoveisRecusados = 0;
  let vistoriaNormal = 0;
  let vistoriaRecuperada = 0;
  let totalImoveisVisitados = 0;
  let totalAmostras = 0;
  let amostrasColetadas = 0;
  let amostrasPendentes = 0;
  let amostrasPositivas = 0;
  let amostrasNegativas = 0;
  let imoveisPlanejados = 0;
  let totalImoveisAgente = [];
  let imoveisTrabalhados = [];

  trabalhos.map(trabalho => {
    const vistorias = trabalho.vistorias;
    const rotas = trabalho.rota;

    totalImoveisVisitados += vistorias.length;

    const index = totalImoveisAgente.findIndex(p => p.usuario.id === trabalho.usuario.id);

    if (index >= 0) {
      imoveisPorAgente[index].imoveisVistoriados += vistorias.length;
    } else {
      const imoveisPorAgente = {
        usuario: trabalho.usuario,
        imoveisVistoriados: vistorias.length,
      }

      totalImoveisAgente.push(imoveisPorAgente)
    }

    rotas.map(rota => {
      imoveisPlanejados += rota.imoveis.length;
    });

    vistorias.map(vistoria => {
      const depositos = vistoria.depositos;

      switch (vistoria.pendencia) {
        case "R": 
          imoveisRecusados++;
          break;
        case "F":
          imoveisFechados++;
          break;
        case null:
          break;
        default:
          break;
      }

      switch (vistoria.situacaoVistoria) {
        case "R": 
          vistoriaRecuperada++;
          break;
        case "N":
          vistoriaNormal++;
          break;
        default:
          break;
      }

      depositos.map(deposito => {
        const amostras = deposito.amostras;

        amostras.map(amostra => {
          totalAmostras++;

          switch (amostra.situacaoAmostra) {
            case 1:
              amostrasColetadas++;
              break;
            case 2:
              amostrasPendentes++;
              break;
            case 3:
              amostrasPositivas++;
              break;
            case 4:
              amostrasNegativas++;
              break;
          }
        });
      });
    });
  });

  const resultado = {
    amostras: {
      total: totalAmostras,
      coletadas: amostrasColetadas,
      pendentes: amostrasPendentes,
      positivas: amostrasPositivas,
      negativas: amostrasNegativas,
    },
    imoveis: {
      totalVistoriado: totalImoveisVisitados,
      naoVistoriados: imoveisPlanejados - totalImoveisVisitados,
      fechados: imoveisFechados,
      recusados: imoveisRecusados,
      vistoriaNormal,
      vistoriaRecuperada,
    },
    vistoriasPorAgentes: totalImoveisAgente,
  }

  return res.json(resultado);
}

router.get('/equipe/:equipe_id/data/:dia', getTeamDailyActivity);
router.get('/equipe/:equipe_id', getTeamActivityReport);
router.get('/semanal', getActivityWeeklyReport);
router.get('/atividade/:atividade_id', getCurrentActivityReport);

module.exports = app => app.use('/relatorios', router);