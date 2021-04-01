const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Atividade = require('../models/Atividade');
const Ciclo = require('../models/Ciclo');
const Quarteirao = require('../models/Quarteirao');
const Equipe = require('../models/Equipe');
const Usuario = require('../models/Usuario');
const TrabalhoDiario = require('../models/TrabalhoDiario');
const Rota = require('../models/Rota');

const getEpiWeek = require('../util/getEpiWeek');
const allowFunction = require('../util/allowFunction');

const { format, parseISO } = require('date-fns');

const router = express.Router();
router.use(authMiddleware);

getTeamDailyActivity = async (req, res) => {
    const {equipe_id, dia} = req.params;

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

    if (!trabalhos) {
        return res.status(200).json([]);
    }

    let imoveisFechados = 0;
    let imoveisRecusados = 0;
    let vistoriaNormal = 0;
    let vistoriaRecuperada = 0;
    let totalImoveisVisitados = 0;
    let totalAmostras = 0;
    let amostrasColetadas = 0;
    let amostrasPendentes = 0;
    let amostrasExaminadas = 0;
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
        })

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
                            amostrasExaminadas++;
                            break;
                    }
                })
            })
        })
    })

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
        vistoriasPorAgentes: totalImoveisAgente,
    }

    return res.json(resultado)
}

getTeamCycleActivity = async (req, res) => {
    return res.json({message: 'oi'})
}

getActivityWeeklyReport = async (req, res) => {
    const { atividade_id, ano, semana } = req.query;
    const userId = req.userId;

    // Validação da rota

    const user_request = await Usuario.findByPk( userId );

    const allow = await allowFunction( user_request.id, 'definir_trabalho_diario' );
		if( !allow )
			return res.status(403).json({ error: 'Acesso negado' });

    const semanaEpidemiologica = getEpiWeek(semana, ano);

    // O número máximo de semanas em um ano é 53, em situações
    // específicas

    if (semanaEpidemiologica === -1) {
        return res.status(400).json({ error: `Este ano não possui ${semana} semanas epidemiológicas` })
    }

    const [data_inicio, data_fim] = semanaEpidemiologica;

    // Selecionando todas as equipes daquela atividade

    let equipes = await Equipe.findAll({
        where: {
            atividade_id
        },
        attributes: ['id']
    });

    equipes = equipes.map(({ id }) => id);

    // Selecionando todas as vistorias realizadas
    // por aquelas equipes

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

    if (trabalhos.length === 0) {
        return res.json([])
    }

    let propertiesByType = [
        { label: 'Residencial', sigla: 'R', value: 0 },
        { label: 'Terreno Baldio', sigla: 'TB', value: 0 },
        { label: 'Comercial', sigla: 'C', value: 0 },
        { label: 'Ponto Estratégico', sigla: 'PE', value: 0 },
    ];
    
    let propertiesByStatus = [
        { label: 'Normal', value: 0 },
        { label: 'Recuperado', value: 0 },
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

    let totalSample = 0;

    // Gerando os indíces do relatório

    trabalhos.map(trabalho => {
        const vistorias = trabalho.vistorias;

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

            depositos.map(deposito => {
                const amostras = deposito.amostras;

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

                switch (deposito.fl_eliminado) {
                    case true:
                        recipientDestination[0].value++;
                        break;
                }

                switch (deposito.fl_tratado) {
                    case true:
                        recipientDestination[1].value++;
                        break;
                }

                amostras.map(amostra => {
                    totalSample++;
                })
            })
        })
    });

    const resultado = {
        epiWeek: {
            semana,
            ano, 
            inicio: format(parseISO(data_inicio), 'dd-MM-yyyy'),
            fim: format(parseISO(data_fim), 'dd-MM-yyyy'),
        },
        propertiesByType,
        propertiesByStatus,
        propertiesByPendency,
        recipientsByType,
        recipientDestination,
        totalSample
    }

    return res.json(resultado)
}

getCurrentActivityReport = async (req, res) => {
    const { atividade_id } = req.params;

    let equipes = await Equipe.findAll({
        where: {
            atividade_id
        },
        attributes: ['id']
    }).then(equipe => {
        return equipe.map(({ id }) => id);
    });

    return res.json(equipes);
}

router.get('/equipe/:equipe_id/data/:dia', getTeamDailyActivity);
router.get('/ciclo/:ciclo_id/equipe/:equipe_id', getTeamCycleActivity);
router.get('/semanal', getActivityWeeklyReport);
router.get('/atividade/:atividade_id', getCurrentActivityReport);

module.exports = app => app.use('/relatorios', router);