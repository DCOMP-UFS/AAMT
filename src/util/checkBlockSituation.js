const Atividade = require('../models/Atividade');
const Quarteirao = require('../models/Quarteirao');
const Equipe = require('../models/Equipe');
const TrabalhoDiario = require('../models/TrabalhoDiario');
const Vistoria = require('../models/Vistoria');

const { Op } = require('sequelize');

module.exports = async (quarteiroes_trabalhados, trabalho_diario_id) => {
    // Selecionando a atividade associada ao trabalho diário
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

    const { atividade_id } = trabalho.equipe;

    // Selecionando a quantidade de imóveis nos 
    // quarteirões trabalhados
    let sql_quarteiroes = 
        'SELECT ' +
            'q.id, ' +
            'count( q.* ) ' +
        'FROM ' +
            'quarteiroes as q ' +
            'JOIN lados as l ON (q.id = l.quarteirao_id) ' +
            'JOIN imoveis as i ON (l.id = i.lado_id) ' +
        'WHERE ' +
            'q.id IN ' + '(' + quarteiroes_trabalhados + ') ' +
        'GROUP BY ' +
            'q.id';

    const quarteiroes = await Quarteirao.sequelize.query(sql_quarteiroes);

    // Selecionando as vistorias trabalhadas
    // nos quarteirões indicados 
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
	        `atv.id = ${atividade_id} ` + 
            'AND ' + 
                'l.quarteirao_id IN ' + '(' + quarteiroes_trabalhados + ') ' +
        'GROUP BY ' +
            'l.quarteirao_id';

    const vistorias = await Vistoria.sequelize.query(
        sql_vistoria, 
    );

    const totalImoveis = quarteiroes[1].rows;
    const totalVistorias = vistorias[1].rows;

    return totalImoveis;
}