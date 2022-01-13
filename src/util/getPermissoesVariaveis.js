const Membro = require( '../models/Membro' );

/**
 * Consulta todas as permissões variaveis que o usuário tem direito pelo seu id
 * @param {integer} usuario_id 
 * @returns {array} array de string
 */
module.exports = async ( usuario_id ) => {
  let fl_supervisor = false;
  let fl_agente     = false;
  const membro      = await Membro.findAll( {
    where: {
      usuario_id
    }
  } );

  for( const m of membro ) {
    if( m.tipoPerfil == 3 )
      fl_supervisor = true;
    else if( m.tipoPerfil == 4 )
      fl_agente = true;
  }

  let permissoesVariaveis = [];
  if( fl_supervisor ) {
    permissoesVariaveis = [
      'relatorio_por_atividade_da_equipe', 
      'relatorio_por_atividade', 
      'relatorio_boletim_semanal', 
      'relatorio_boletim_diario_equipe', 
      'relatorio_boletim_diario', 
      'definir_trabalho_diario', 
      'visualizar_amostra', 
      'realizar_exame_amostra', 
      'encaminhar_amostra'
    ];
  }

  if( fl_agente ) {
    permissoesVariaveis = [
      ...permissoesVariaveis,
      'relatorio_meu_boletim', 
      'realizar_vistoria'
    ];
  }

  return permissoesVariaveis;
}