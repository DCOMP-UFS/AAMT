import { all } from 'redux-saga/effects';

import { quarteiraoSaga } from './Quarteirao/quarteiraoSagas';
import { rotaSaga } from './Rota/rotaSagas';
import { atividadeSaga } from './Atividade/atividadeSagas';
import { cicloSaga } from './Ciclo/cicloSagas';
import { amostraSaga } from './Amostra/amostraSagas';
import { categoriaSaga } from './Categoria/categoriaSagas';
import { estadoSaga } from './Estado/estadoSagas';
import { zonaSaga } from './Zona/zonaSagas';
import { imovelSaga } from './Imovel/imovelSagas';
import { localidadeSaga } from './Localidade/localidadeSagas';
import { metodologiaSaga } from './Metodologia/metodologiaSagas';
import { municipioSaga } from './Municipio/municipioSagas';
import { paisSaga } from './Pais/paisSagas';
import { regiaoSaga } from './Regiao/regiaoSagas';
import { regionalSaudeSaga } from './RegionalSaude/regionalSaudeSagas';
import { vistoriaSaga } from './Vistoria/vistoriaSagas';
import { ruaSaga } from './Rua/ruaSagas';
import { trabalhoDiarioSaga } from './TrabalhoDiario/trabalhoDiarioSagas';
import { usuarioSaga } from './Usuario/usuarioSagas';
import { laboratorioSaga } from './Laboratorio/laboratorioSagas';
import { mosquitoSaga } from './Mosquito/mosquitoSagas';
import { relatorioSaga } from './Relatorio/relatorioSagas';
import { equipeSaga } from './Equipe/equipeSagas';

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
    laboratorioSaga(),

    // Gerir Mosquito
    mosquitoSaga(),

    // Gerir Imóvel
    imovelSaga(),

    // Gerir Relatórios
    relatorioSaga(),

    // Gerir Equipe
    equipeSaga(),
  ]);
}
