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
const criarLink = ( slug, description, active, icon, url ) => {
  return { slug, description, type: "link", active, icon, url: location + url, submenu: [] }
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
function criarNav( slug, description, active, icon, submenu ){
  return { slug, description, type: "nav", active, icon, submenu }
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

const itens = {
  categoriaDashboard: criarCategoriaMenu( "Dashboard", "dashboard" ),
  dashboardRegional: criarLink( "dashboard_ragional", "Dashboard", false, FA.FaChartPie, "/dash/regional" ),
  dashboardLaboratorio: criarLink( "dashboard_laboratorio", "Dashboard", false, FA.FaChartPie, "/dash/laboratorio" ),
  dashboardMunicipio: criarLink( "dashboard_municipío", "Dashboard", false, FA.FaChartPie, "/dash/municipio" ),
  categoriaOperacional: criarCategoriaMenu( "Operacional", "operacional" ),
  ciclo: criarNav( "ciclo", "Ciclos", false, FA.FaSyncAlt, [
    criarSubmenu( "ci_dashboard", false, "Dashboard", "/ciclos" ),
    criarSubmenu( "ci_consultar", false, "Consultar", "/ciclos/consultar" ),
    criarSubmenu( "ci_cadastrar", false, "Cadastrar", "/ciclos/cadastrar" ),
  ] ),
  atividade: criarNav( "atividade", "Atividades", false, IoIosPaper, [
    criarSubmenu( "at_consultar", false, "Consultar", "/atividadesRegional/" ),
    criarSubmenu( "at_cadastrar", false, "Cadastrar", "/atividadesRegional/cadastrar" ),
  ] ),
  cadastroBasico: criarCategoriaMenu( "Cadastros Básicos", "cadastroBasico" ),
  usuario: criarLink( "usuario", "Usuários", false, FA.FaUsers, "/usuariosRegional" ),
  municipio: criarLink( "municipio", "Municípios", false, FA.FaCity, "/municipios" ),
  amostra: criarLink( "amostra", "Amostras", false, FA.FaVial, "/amostras" ),
  atividadeMunicipio: criarNav( "atividade_municipio", "Atividades", false, IoIosPaper, [
    criarSubmenu( "atm_consultar", false, "Consultar", "/atividadesMunicipal/" ),
    criarSubmenu( "atm_cadastrar", false, "Cadastrar", "/atividadesMunicipal/cadastrar" ),
  ] ),
  usuarioMunicipio: criarLink( "usuario_municipio", "Usuários", false, FA.FaUsers, "/usuarios" ),
  localidade: criarLink( "localidade", "Bairro/Localidade", false, FA.FaMapSigns, "/localidades" ),
  zona: criarLink( "zona", "Zonas", false, ViewCompactIcon, "/zonas" ),
  quarteirao: criarLink( "quarteirao", "Quarteirões", false, BorderAllIcon, "/quarteiroes" ),
  imovel: criarLink( "imovel", "Imóveis", false, IoIosHome, "/imoveis" ),
  laboratorio: criarLink( "laboratorio", "Laboratórios", false, FA.FaVials, "/laboratorios" ),
  rota: criarLink( "rota", "Rota", false, FA.FaRoute, "/rota" ),
  vistoria: criarLink( "vistoria", "Vistorias", false, FA.FaClipboardCheck, "/vistoria" ),
  meu_boletim: criarLink( "meu_boletim", "Relatórios", false, FA.FaChartPie, "/relatorio/meuBoletim/" ),
  planejar_rota: criarLink( "planejar_rota", "Planejar Rota", false, FA.FaRoute, "/rota/planejar" ),
  categoriaCadastrosBasicos: criarCategoriaMenu( "Cadastros Básicos", "cadastrosBasicos" ),
  usuarios: criarLink( "usuarios", "Usuários", false, FA.FaUsers, "/cg/usuarios" ),
  municipios: criarLink( "municipios","Municípios", false, FA.FaCity, "/municipios"),
};

/**
 * Menus por função
 */
export const menus = {
  definir_ciclo: [
    itens.categoriaOperacional,
    itens.ciclo,
  ],
  manter_atividade: [
    itens.categoriaOperacional,
    itens.atividade,
  ],
  manter_municipio: [
    itens.cadastroBasico,
    itens.municipio,
  ],
  manter_usuario: [
    itens.cadastroBasico,
    itens.usuario,
  ],
  realizar_vistoria: [
    itens.categoriaOperacional,
    itens.rota,
    itens.vistoria,
    itens.meu_boletim,
  ],
  definir_trabalho_diario: [
    itens.categoriaOperacional,
    itens.planejar_rota,
    itens.vistoria,
  ],
  manter_municipio: [
    itens.cadastroBasico,
    itens.municipios
  ],
  visualizar_amostra: [
    itens.categoriaOperacional,
    itens.amostra
  ],
  manter_atividade_municipio: [
    itens.categoriaOperacional,
    itens.atividadeMunicipio
  ],
  manter_usuario_municipio: [
    itens.cadastroBasico,
    itens.usuarioMunicipio,
  ],
  manter_localidade: [
    itens.cadastroBasico,
    itens.localidade,
  ],
  manter_zona: [
    itens.cadastroBasico,
    itens.zona,
  ],
  manter_quarteirao: [
    itens.cadastroBasico,
    itens.quarteirao,
  ],
  manter_imovel: [
    itens.cadastroBasico,
    itens.imovel,
  ],
  manter_laboratorio: [
    itens.cadastroBasico,
    itens.laboratorio,
  ],
  dashboard_regional: [
    itens.categoriaDashboard,
    itens.dashboardRegional
  ],
  dashboard_laboratorio: [
    itens.categoriaDashboard,
    itens.dashboardLaboratorio
  ],
  dashboard_municipal: [
    itens.categoriaDashboard,
    itens.dashboardMunicipio
  ],
};