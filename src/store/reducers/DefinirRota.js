import { ActionTypes } from '../actions/DefinirRotaActions';

const INITIAL_STATE = {
  atividades: [],
  equipes: [],
  planejamentoIndex: -1,
  planejamento: [],
  toggleLoading: false,
  reload: false
}

export default function Atividade(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_ACTIVITIES_SUPERVISED_SUCCESS: {
      return {
        ...state,
        atividades: action.payload.atividades
      }
    }

    case ActionTypes.ADD_PLANEJAMENTO: {
      const { equipe } = action.payload;
      let planejamento = state.planejamento;
      let planejamentoIndex = -1;
      const plain = planejamento.find( (pl, index) => {
        if( pl.idEquipe === equipe.id ) {
          planejamentoIndex = index;
          return true;
        }

        return false;
      });

      if( !planejamento[0] ) {
        planejamento = [{
          idEquipe: equipe.id,
          membros: equipe.membros,
          quarteiroes: equipe.quarteiroes.map( q => ({
            id: q.id,
            localidade_id: q.localidade_id,
            zona_id: q.zona_id,
            numero: q.numero,
            lados: q.lados
          })),
          rotas: []
        }];

        planejamentoIndex = 0;
      }else if( !plain ) {
        planejamento.push({
          idEquipe: equipe.id,
          membros: equipe.membros,
          quarteiroes: equipe.quarteiroes.map( q => ({
            id: q.id,
            localidade_id: q.localidade_id,
            zona_id: q.zona_id,
            numero: q.numero,
            lados: q.lados
          })),
          rotas: []
        });

        planejamentoIndex = planejamento.length - 1;
      }

      return {
        ...state,
        planejamento,
        planejamentoIndex,
        reload: !state.reload
      }
    }

    case ActionTypes.GET_TEAMS_SUP_SUCCESS: {
      return {
        ...state,
        equipes: action.payload.equipes
      }
    }

    case ActionTypes.ADD_ROTA: {
      const index = state.planejamentoIndex;
      let planejamento = state.planejamento;

      if( !planejamento[ index ].rotas[0] ) {
        planejamento[ index ].rotas = [{
          usuario_id: -1,
          lados: []
        }];
      }else {
        planejamento[ index ].rotas.push({
          usuario_id: -1,
          lados: []
        });
      }

      return {
        ...state,
        planejamento,
        reload: !state.reload
      }
    }

    case ActionTypes.REMOVER_ROTA: {
      const index = action.payload.index;
      const planejamentoIndex = state.planejamentoIndex;
      let planejamento = state.planejamento;
      let rotas = planejamento[ planejamentoIndex ].rotas;

      planejamento[ planejamentoIndex ].quarteiroes = planejamento[ planejamentoIndex ].quarteiroes.map( q => {
        q.lados = q.lados.map( l => {
          rotas[ index ].lados.forEach( rl => {
            if( rl.id === l.id )
              l.rotaIndex = -1;
          });

          return l;
        });

        return q;
      });

      rotas.splice( index, 1 );
      planejamento[ planejamentoIndex ].rotas = rotas;

      return {
        ...state,
        planejamento,
        reload: !state.reload
      }
    }

    case ActionTypes.ALTERAR_USUARIO_ROTA: {
      const index = action.payload.index;
      const usuario_id = action.payload.usuario_id;
      const planejamentoIndex = state.planejamentoIndex;
      let planejamento = state.planejamento;

      planejamento[ planejamentoIndex ].rotas.forEach(( r, i ) => {
        if( r.usuario_id === usuario_id )
          planejamento[ planejamentoIndex ].rotas[ i ].usuario_id = -1;
      });

      planejamento[ planejamentoIndex ].rotas[ index ].usuario_id = usuario_id;

      return {
        ...state,
        planejamento,
        reload: !state.reload
      }
    }

    case ActionTypes.ADD_LADO_A_ROTA: {
      const { quarteiraoIndex, ladoIndex, rotaIndex } = action.payload;
      const planejamentoIndex = state.planejamentoIndex;
      let planejamento = state.planejamento;
      let rota = planejamento[ planejamentoIndex ].rotas[ rotaIndex ];

      planejamento[ planejamentoIndex ].quarteiroes[ quarteiraoIndex ].lados[ ladoIndex ].rotaIndex = rotaIndex;

      if( !rota.lados[0] ) {
        rota.lados[0] = planejamento[ planejamentoIndex ].quarteiroes[ quarteiraoIndex ].lados[ ladoIndex ];
      }else {
        rota.lados.push(
          planejamento[ planejamentoIndex ].quarteiroes[ quarteiraoIndex ].lados[ ladoIndex ]
        );
      }

      return {
        ...state,
        planejamento,
        reload: !state.reload
      }
    }

    case ActionTypes.REMOVE_LADO_A_ROTA: {
      const { quarteiraoIndex, ladoIndex, rotaIndex } = action.payload;
      const planejamentoIndex = state.planejamentoIndex;
      let planejamento = state.planejamento;
      let rota = planejamento[ planejamentoIndex ].rotas[ rotaIndex ];

      planejamento[ planejamentoIndex ].quarteiroes[ quarteiraoIndex ].lados[ ladoIndex ].rotaIndex = -1;

      rota.lados.splice( ladoIndex, 1 );

      return {
        ...state,
        planejamento,
        reload: !state.reload
      }
    }

    case ActionTypes.CARREGAR_PLANEJAMENTO_CACHE: {
      const { planejamento: planejamentoCache } = action.payload;
      let planejamento = state.planejamento;

      planejamento = planejamentoCache;

      return {
        ...state,
        planejamento
      }
    }

    case ActionTypes.ARMAZENAR_PLANEJAMENTO_SUCCESS: {
      return {
        ...state,
        toggleLoading: !state.toggleLoading
      }
    }

    default:
      return { ...state }
  }
}
