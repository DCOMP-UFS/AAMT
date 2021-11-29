import { all, takeLatest } from 'redux-saga/effects';

// Nova Estrutura
import { ActionTypes as NW_LaboratorioActions } from '../Laboratorio/laboratorioActions';
import { ActionTypes as NW_MosquitoActions } from '../Mosquito/mosquitoActions';
import { ActionTypes as NW_RelatorioActions } from '../Relatorio/relatorioActions';
import { ActionTypes as NW_EquipeActions } from '../Equipe/equipeActions';

// Nova Estrutura
import * as NW_LaboratorioSagas from '../Laboratorio/laboratorioSagas';
import * as NW_MosquitoSagas from '../Mosquito/mosquitoSagas';
import * as NW_RelatorioSagas from '../Relatorio/relatorioSagas';
import * as NW_EquipeSagas from '../Equipe/equipeSagas';

import { quarteiraoSaga } from '../Quarteirao/quarteiraoSagas';
import { rotaSaga } from '../Rota/rotaSagas';
import { atividadeSaga } from '../Atividade/atividadeSagas';
import { cicloSaga } from '../Ciclo/cicloSagas';
import { amostraSaga } from '../Amostra/amostraSagas';
import { categoriaSaga } from '../Categoria/categoriaSagas';
import { estadoSaga } from '../Estado/estadoSagas';
import { zonaSaga } from '../Zona/zonaSagas';
import { imovelSaga } from '../Imovel/imovelSagas';
import { localidadeSaga } from '../Localidade/localidadeSagas';
import { metodologiaSaga } from '../Metodologia/metodologiaSagas';
import { municipioSaga } from '../Municipio/municipioSagas';
import { paisSaga } from '../Pais/paisSagas';
import { regiaoSaga } from '../Regiao/regiaoSagas';
import { regionalSaudeSaga } from '../RegionalSaude/regionalSaudeSagas';
import { vistoriaSaga } from '../Vistoria/vistoriaSagas';
import { ruaSaga } from '../Rua/ruaSagas';
import { trabalhoDiarioSaga } from '../TrabalhoDiario/trabalhoDiarioSagas';
import { usuarioSaga } from '../Usuario/usuarioSagas';

export default function* rootSaga() {
  yield all([
    // Gerir Usuário
    usuarioSaga(),

    // Gerir Município
    municipioSaga(),

    // Gerir Localidade
    localidadeSaga(),

    // Gerir Categoria
    categoriaSaga(),

    // Gerir Zonas
    zonaSaga(),

    // Gerir País
    paisSaga(),

    // Gerir Região
    regiaoSaga(),

    // Gerir Estado
    estadoSaga(),

    // Gerir Regionais de Saúde
    regionalSaudeSaga(),

    // Gerir Quarteirão
    quarteiraoSaga(),

    // Gerir Rua
    ruaSaga(),

    // Gerir Ciclo
    cicloSaga(),

    // Gerir Metodologia
    metodologiaSaga(),

    // Gerir Atividade
    atividadeSaga(),
    
    // Gerir Rotas
    rotaSaga(),

    // Gerir Vistoria
    vistoriaSaga(),

    // Gerir Trabalho Diario
    trabalhoDiarioSaga(),

    // Gerir Amostra
    amostraSaga(),

    // Gerir Laboratório
    takeLatest( NW_LaboratorioActions.GET_LABORATORIOS_REQUEST, NW_LaboratorioSagas.getLaboratorios ),

    // Gerir Mosquito
    takeLatest( NW_MosquitoActions.GET_MOSQUITOS_REQUEST, NW_MosquitoSagas.getMosquitos ),

    // Gerir Imóvel
    imovelSaga(),

    // Gerir Relatórios
    takeLatest( NW_RelatorioActions.GET_BOLETIM_SEMANAL_REQUEST, NW_RelatorioSagas.getBoletimSemanal ),
    takeLatest( NW_RelatorioActions.GET_BOLETIM_DIARIO_EQUIPE_REQUEST, NW_RelatorioSagas.getBoletimDiarioEquipe ),
    takeLatest( NW_RelatorioActions.GET_BOLETIM_ATIVIDADE_EQUIPE_REQUEST, NW_RelatorioSagas.getBoletimAtividadeEquipe ),
    takeLatest( NW_RelatorioActions.GET_BOLETIM_ATIVIDADE_REQUEST, NW_RelatorioSagas.getBoletimAtividade ),

    // Gerir Equipe
    takeLatest( NW_EquipeActions.GET_MEMBROS_REQUEST, NW_EquipeSagas.getMembros ),
  ]);
}
