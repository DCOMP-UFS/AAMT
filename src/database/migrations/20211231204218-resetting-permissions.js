'use strict';
const { Op } = require( 'sequelize' );

const createPermission = ( funcao_id, tipo_perfil ) => {
  return { funcao_id, tipo_perfil, created_at: new Date(), updated_at: new Date() }
}

module.exports = {
  up: async ( queryInterface, Sequelize ) => {    
    queryInterface.bulkDelete( 'permissoes', null, {} );

    const [ coodGeralFuncoes ]    = await queryInterface.sequelize.query( "SELECT * FROM funcoes WHERE nome IN ( 'relatorio_por_atividade_regional', 'definir_ciclo', 'manter_regional_saude', 'manter_municipio', 'manter_usuario', 'manter_atividade' );" );
    const [ coodFuncoes ]         = await queryInterface.sequelize.query( "SELECT * FROM funcoes WHERE nome IN ( 'relatorio_por_atividade_da_equipe', 'relatorio_por_atividade', 'relatorio_boletim_semanal', 'relatorio_boletim_diario_equipe', 'relatorio_boletim_diario', 'manter_atividade_municipio', 'manter_usuario_municipio', 'manter_localidade', 'manter_zona', 'manter_quarteirao', 'manter_imovel', 'manter_laboratorio', 'manter_rua' );" );
    const [ supervisorFuncoes ]   = await queryInterface.sequelize.query( "SELECT * FROM funcoes WHERE nome IN ( 'relatorio_meu_boletim', 'realizar_vistoria', 'relatorio_por_atividade_da_equipe', 'relatorio_por_atividade', 'relatorio_boletim_semanal', 'relatorio_boletim_diario_equipe', 'relatorio_boletim_diario', 'manter_localidade', 'manter_imovel', 'manter_quarteirao', 'definir_trabalho_diario', 'visualizar_amostra', 'realizar_exame_amostra', 'encaminhar_amostra' );" );
    const [ agenteFuncoes ]       = await queryInterface.sequelize.query( "SELECT * FROM funcoes WHERE nome IN ( 'relatorio_meu_boletim', 'realizar_vistoria', 'manter_imovel' );" );
    const [ laboratorioFuncoes ]  = await queryInterface.sequelize.query( "SELECT * FROM funcoes WHERE nome IN ( 'realizar_exame_amostra', 'visualizar_amostra' );" );

    let permissoesCoordGeral  = coodGeralFuncoes.map( f => createPermission( f.id, 1 ) );
    let permissoesCoord       = coodFuncoes.map( f => createPermission( f.id, 2 ) );
    let permissoesSupervisor  = supervisorFuncoes.map( f => createPermission( f.id, 3 ) );
    let permissoesAgente      = agenteFuncoes.map( f => createPermission( f.id, 4 ) );
    let permissoesLaboratorio = laboratorioFuncoes.map( f => createPermission( f.id, 5 ) );

    return queryInterface.bulkInsert( 'permissoes', [
      ...permissoesCoordGeral,
      ...permissoesCoord,
      ...permissoesSupervisor,
      ...permissoesAgente,
      ...permissoesLaboratorio,
    ] );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'permissoes', null, {} );
  }
};
