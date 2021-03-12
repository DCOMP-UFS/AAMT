const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Atividade = require('../models/Atividade');
const Ciclo = require('../models/Ciclo');
const Municipio = require('../models/Municipio');
const Localidade = require('../models/Localidade');
const Zona = require('../models/Zona');
const Quarteirao = require('../models/Quarteirao');
const Estrato = require('../models/Estrato');
const SituacaoQuarteirao = require('../models/SituacaoQuarteirao');
const Equipe = require('../models/Equipe');
const EquipeQuarteirao = require('../models/EquipeQuarteirao');
const Membro = require('../models/Membro');
const Usuario = require('../models/Usuario');
const TrabalhoDiario = require('../models/TrabalhoDiario');
const Rota = require('../models/Rota');

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

    console.log('Fechados: ' + imoveisFechados);
    console.log('Recusados: ' + imoveisRecusados);
    console.log('Vistoria Normal: ' + vistoriaNormal);
    console.log('Vistoria Recuperada: ' + vistoriaRecuperada);
    console.log('Total de imóveis visitados: ' + totalImoveisVisitados);
    console.log('Total de amostras: ' + totalAmostras);
    console.log('Total de amostras coletadas: ' + amostrasColetadas);
    console.log('Total de amostras pendentes: ' + amostrasPendentes);
    console.log('Total de amostras examinadas: ' + amostrasExaminadas);
    console.log('Total de imóveis planejados: ' + imoveisPlanejados);

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

router.get('/equipe/:equipe_id/data/:dia', getTeamDailyActivity);
router.get('/ciclo/:ciclo_id/equipe/:equipe_id', getTeamCycleActivity);

module.exports = app => app.use('/relatorios', router);