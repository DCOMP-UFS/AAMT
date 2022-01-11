import * as FA from 'react-icons/fa';
import { IoIosPaper, IoIosHome } from 'react-icons/io';
import { ViewCompact as ViewCompactIcon, BorderAll as BorderAllIcon } from '@material-ui/icons';

const location = window.location.origin.toString();

/**
 * Esta função retorna um objeto de menu categoria válido
 * 
 * @param {String} description 
 * @returns {Object}
 */
const criarCategoriaMenu = ( description, slug ) => {
  return { description, slug, type: "category" }
}

/**
 * Esta função retorna um objeto válido de link menu
 * 
 * @param {Integer} id 
 * @param {String} description 
 * @param {Boolean} active 
 * @param {Component} icon 
 * @param {String} url 
 * @returns {Object}
 */
const criarLink = ( slug, description, active, icon, url, categoriaSlug ) => {
  return { slug, description, type: "link", active, icon, url: location + url, submenu: [], categoria: categoriaSlug }
}

/**
 * Esta função retorna um objeto válido de menu de navegação
 * 
 * @param {Integer} id 
 * @param {String} slug 
 * @param {String} description 
 * @param {Boolean} active 
 * @param {Component} icon 
 * @param {Object} submenu 
 * @returns {Object} 
 */
function criarNav( slug, description, active, icon, submenu, categoriaSlug ){
  return { slug, description, type: "nav", active, icon, submenu, categoria: categoriaSlug }
}

/**
 * Esta função retorna um objeto válido de submenu de naveção
 * 
 * @param {String} slug 
 * @param {Boolean} active 
 * @param {String} description 
 * @param {String} url 
 * @returns {Object}
 */
function criarSubmenu( slug, active, description, url ) {
  return { slug, active, description, url: location + url }
}

export const itens = {
  dashboardRegional: criarLink( "dashboard_ragional", "Dashboard", false, FA.FaChartPie, "/dash/regional", "dashboard" ),
  dashboardLaboratorio: criarLink( "dashboard_laboratorio", "Dashboard", false, FA.FaChartPie, "/dash/laboratorio", "dashboard" ),
  dashboardMunicipio: criarLink( "dashboard_municipío", "Dashboard", false, FA.FaChartPie, "/dash/municipio", "dashboard" ),
  ciclo: criarNav( "ciclo", "Ciclos", false, FA.FaSyncAlt, [
    criarSubmenu( "ci_consultar", false, "Consultar", "/ciclos/consultar" ),
    criarSubmenu( "ci_cadastrar", false, "Cadastrar", "/ciclos/cadastrar" ),
  ], "operacional" ),
  atividade: criarNav( "atividade", "Atividades", false, IoIosPaper, [
    criarSubmenu( "at_consultar", false, "Consultar", "/atividadesRegional/" ),
    criarSubmenu( "at_cadastrar", false, "Cadastrar", "/atividadesRegional/cadastrar" ),
  ], "operacional" ),
  usuario: criarLink( "usuario", "Usuários", false, FA.FaUsers, "/usuariosRegional", "cadastroBasico" ),
  municipio: criarLink( "municipio", "Municípios", false, FA.FaCity, "/municipios", "cadastroBasico" ),
  amostra: criarLink( "amostra", "Amostras", false, FA.FaVial, "/amostras", "operacional" ),
  atividadeMunicipio: criarNav( "atividade_municipio", "Atividades", false, IoIosPaper, [
    criarSubmenu( "atm_consultar", false, "Consultar", "/atividadesMunicipal/" ),
    criarSubmenu( "atm_cadastrar", false, "Cadastrar", "/atividadesMunicipal/cadastrar" ),
  ], "operacional" ),
  usuarioMunicipio: criarLink( "usuario_municipio", "Usuários", false, FA.FaUsers, "/usuarios", "cadastroBasico" ),
  localidade: criarLink( "localidade", "Bairro/Localidade", false, FA.FaMapSigns, "/localidades", "cadastroBasico" ),
  zona: criarLink( "zona", "Zonas", false, ViewCompactIcon, "/zonas", "cadastroBasico" ),
  quarteirao: criarLink( "quarteirao", "Quarteirões", false, BorderAllIcon, "/quarteiroes", "cadastroBasico" ),
  imovel: criarLink( "imovel", "Imóveis", false, IoIosHome, "/imoveis", "cadastroBasico" ),
  laboratorio: criarLink( "laboratorio", "Laboratórios", false, FA.FaVials, "/laboratorios", "cadastroBasico" ),
  rota: criarLink( "rota", "Rota", false, FA.FaRoute, "/rota", "operacional" ),
  vistoria: criarLink( "vistoria", "Vistorias", false, FA.FaClipboardCheck, "/vistoria", "operacional" ),
  meu_boletim: criarLink( "meu_boletim", "Relatórios", false, FA.FaChartPie, "/relatorio/meuBoletim/", "operacional" ),
  planejar_rota: criarLink( "planejar_rota", "Planejar Rota", false, FA.FaRoute, "/rota/planejar", "operacional" ),
  relatorio: criarNav( "relatorio", "Relatórios", false, FA.FaChartPie, [], "operacional" ),
  boletimDiario: criarSubmenu( "rlt_boletimDiario", false, "Boletim diário", "/relatorio/diario" ),
  boletimDiarioEquipe: criarSubmenu( "rlt_boletimDiarioEquipe", false, "Boletim diário por Equipe", "/relatorio/diarioEquipe" ),
  boletimSemanal: criarSubmenu( "rlt_boletimSemanal", false, "Boletim semanal", "/relatorio/semanal" ),
  porAtividade: criarSubmenu( "rlt_porAtividade", false, "Boletim por atividade", "/relatorio/atividade" ),
  porAtividadeEquipe: criarSubmenu( "rlt_porAtividadeEquipe", false, "Boletim por atividade por equipe", "/relatorio/atividadeEquipe" ),
};

/**
 * Categorias de menu
 */
export const categorias = [
  criarCategoriaMenu( "Dashboard", "dashboard" ),
  criarCategoriaMenu( "Operacional", "operacional" ),
  criarCategoriaMenu( "Cadastros Básicos", "cadastroBasico" ),
]

/**
 * Menus por função
 */
export const menus = {
  definir_ciclo: [
    itens.ciclo,
  ],
  manter_atividade: [
    itens.atividade,
  ],
  manter_municipio: [
    itens.municipio,
  ],
  manter_usuario: [
    itens.usuario,
  ],
  realizar_vistoria: [
    itens.rota,
    itens.vistoria,
    itens.meu_boletim,
  ],
  definir_trabalho_diario: [
    itens.planejar_rota,
  ],
  visualizar_amostra: [
    itens.amostra
  ],
  manter_atividade_municipio: [
    itens.atividadeMunicipio
  ],
  manter_usuario_municipio: [
    itens.usuarioMunicipio,
  ],
  manter_localidade: [
    itens.localidade,
  ],
  manter_zona: [
    itens.zona,
  ],
  manter_quarteirao: [
    itens.quarteirao,
  ],
  manter_imovel: [
    itens.imovel,
  ],
  manter_laboratorio: [
    itens.laboratorio,
  ],
  dashboard_regional: [
    itens.dashboardRegional
  ],
  dashboard_laboratorio: [
    itens.dashboardLaboratorio
  ],
  dashboard_municipal: [
    itens.dashboardMunicipio
  ],
  relatorio_boletim_diario: [
    itens.boletimDiario
  ],
  relatorio_boletim_diario_equipe: [
    itens.boletimDiarioEquipe
  ],
  relatorio_boletim_semanal: [
    itens.boletimSemanal
  ],
  relatorio_por_atividade: [
    itens.porAtividade
  ],
  relatorio_por_atividade_da_equipe: [
    itens.porAtividadeEquipe
  ],
};