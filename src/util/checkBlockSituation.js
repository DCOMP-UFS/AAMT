const Atividade = require('../models/Atividade');
const Quarteirao = require('../models/Quarteirao');
const Equipe = require('../models/Equipe');
const TrabalhoDiario = require('../models/TrabalhoDiario');
const Vistoria = require('../models/Vistoria');
const Estrato = require('../models/Estrato');
const SituacaoQuarteirao = require('../models/SituacaoQuarteirao');

const { Op } = require('sequelize');

module.exports = async (trabalho_diario_id) => {
    // Seleciona a atividade associada ao trabalho diário
    const trabalho = await TrabalhoDiario.findOne({
        where: {
            id: trabalho_diario_id,
        }, 
        include: [
            {
                association: 'equipe',
                attributes: ['id', 'atividade_id'],
            }
        ],
    });

    if (!trabalho) {
        return;
    }

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

    const quarteiroes = await Quarteirao.sequelize.query(sql_quarteiroes);

    const quarteiroes_trabalhados = quarteiroes[1].rows.map(({ quarteirao_id }) => quarteirao_id);

    // Seleciona o estrato
    const estrato = await Estrato.findOne({
        where: {
            atividade_id,
        },
        attributes: ['id'],
    });

    // Seleciona a situação dos quarteirões
    const situacao_quarteirao = await SituacaoQuarteirao.findAll({
        where: {
            quarteirao_id: {
                [Op.in]: quarteiroes_trabalhados,
            },
            estrato_id: estrato.id
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
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
            `v.situacao_vistoria = 'N' ` + 
            'AND ' +
            'l.quarteirao_id IN ' + '(' + quarteiroes_trabalhados + ') ' +
        'GROUP BY ' +
            'l.quarteirao_id';

    const vistorias = await Vistoria.sequelize.query(
        sql_vistoria, 
    );

    const totalImoveisQuarteirao = quarteiroes[1].rows;
    const totalVistoriasQuarteirao = vistorias[1].rows;

    /*
        Compara a quantidade de imóveis do quarteirão com a
        quantidade de vistorias realizadas neles durante a atividade.
        Para cada caso, atualiza a situação do quarteirão.
    */
    const promises = totalImoveisQuarteirao.map(async q => {
        const v = totalVistoriasQuarteirao.find(p => p.quarteirao_id === q.id);
        const s = situacao_quarteirao.find(p => p.quarteirao_id === q.id);

        if (v && s) {
            // Quarteirão completo
            if (parseInt(v.count) === parseInt(q.count) && parseInt(s.situacaoQuarteiraoId) !== 3) {
                await s.update({ situacaoQuarteiraoId: 3 });
            }
            // Quarteirão em "aberto" para "fazendo"
            if (parseInt(v.count) > 0 && parseInt(s.situacaoQuarteiraoId) === 1) {
                await s.update({ situacaoQuarteiraoId: 2 });
            }
        }
    });

    return (async () => {
        await Promise.all(promises);
    })();
}