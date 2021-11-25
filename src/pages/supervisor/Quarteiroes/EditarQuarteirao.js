/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../../components/ButtonSave';
import ButtonNewObject from '../../../components/ButtonNewObject';
import AddBox from '@material-ui/icons/AddBox';
import { Fab, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModalImovel from './components/ModalImovel';
import ModalConfirmacao from '../../../components/Modal/ModalConfirmacao';
import ModalLado from './components/ModalLado';
import ModalExcluirLado from './components/ModalLado/ModalExcluirLado';
import { IoIosHome } from 'react-icons/io';
import { FaBorderAll } from 'react-icons/fa';
import ButtonClose from '../../../components/ButtonClose';
import { Lista, ListaItem, ListaIcon } from '../../../components/Listas';
import BorderAllIcon from '@material-ui/icons/BorderAll';

// Models
import { Imovel, Quarteirao, Lado } from '../../../config/models';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarSupervisor';
import { getLocationByCityRequest } from '../../../store/actions/LocalidadeActions';
import { getZoneByLocalityRequest, getZoneByCityRequest } from '../../../store/actions/ZonaActions';
import { getStreetByLocalityRequest } from '../../../store/actions/RuaActions';
import {
  getQuarteiraoPorIdRequest,
  setImovelEditar,
  setQuarteiraoRequest,
  excluirImovelRequest
} from '../../../store/Quarteirao/quarteiraoActions';

// STYLES
import {
  PanelTitle,
  UlHouse,
  LiHouse,
  ContainerIcon,
  DivDescription,
  Container
} from './styles';
import { FormGroup, selectDefault } from '../../../styles/global';
import { ContainerFixed, PageIcon, PageHeader } from '../../../styles/util';

function EditarQuarteirao({ imovel, usuario, quarteirao, ruas, municipio_id, ...props }) {
  const [ id ]                                                = useState( props.match.params.id );
  const [ numero, setNumero ]                                 = useState( null );
  const [ lados, setLados ]                                   = useState( [] );
  const [ localidade, setLocalidade ]                         = useState( {} );
  const [ optionLocalidade, setOptionLocalidade ]             = useState( [] );
  const [ zona, setZona ]                                     = useState( {} );
  const [ optionZona, setOptionZona ]                         = useState( [] );
  const [ showImovel, setShowImovel ]                         = useState( false );
  const [ showModalExcluirImovel, setShowModalExcluirImovel ] = useState( false );
  const [ showLado, setShowLado ]                             = useState( false );
  const [ acao, setAcao ]                                     = useState( 'cadastrar' );
  const [ imovelExcluir, setImovelExcluir ]                   = useState( new Imovel );
  const [ showExcluirLado, setShowExcluirLado ]               = useState( false );
  const [ ladoIndex, setLadoIndex ]                           = useState( -1 );

  useEffect(() => {
    props.changeSidebar( 1, 0 );
    props.getQuarteiraoPorIdRequest( id );
    props.getLocationByCityRequest( municipio_id );
  }, []);

  useEffect(() => {
    loadInfo();
  }, [ quarteirao, props.reload ]);

  useEffect(() => {
    const options = props.localidades.map(( l ) => ({ value: l.id, label: l.nome }));

    setOptionLocalidade( options );
  }, [ props.localidades ]);

  useEffect(() => {
    const options = props.zonas.map(( z ) => {
      if( quarteirao.zona )
        if( z.id === quarteirao.zona.id )
          setZona({ value: z.id, label: z.nome });

      return ({ value: z.id, label: z.nome })
    });

    setOptionZona( options );
  }, [ props.zonas ]);

  useEffect(() => {
    if( Object.entries( localidade ).length > 0 ) {
      props.getZoneByCityRequest( usuario.municipio.id );
      props.getStreetByLocalityRequest( localidade.value );

      setZona( {} );
    }
  }, [ localidade ]);

  /**
   * Monitora a variável do reduce quarteirao.updated, caso seja true
   * atualiza a página para recarregar os elementos
   */
  useEffect( () => {
    if( props.updated )
      document.location.reload( true );
  }, [ props.updated ]);

  /**
   * Função usada para concatenar um model lado no array lados
   * @param {Lado} lado modelo de dados Lado
   */
  const addLado = lado => {
    let max = 0;
    
    lados.forEach( l => {
      if( l.numero > max )
        max = l.numero;
    } );
    
    lado.numero         = max + 1;
    lado.localidade_id  = localidade.value;
    setLados( [ ...lados, lado ] );
    setShowLado( false );
  }

  /**
   * Abrir modal de excluir lado
   * 
   * @param {int} index indice no array lados
   */
  const showModalExcluirLado = index => {
    setLadoIndex( index );
    setShowExcluirLado( true );
  }

  /**
   * Fechar modal de excluir lado
   */
   const hideModalExcluirLado = () => {
    setLadoIndex( -1 );
    setShowExcluirLado( false );
  }

  const loadInfo = () => {
    if( Object.entries( quarteirao ).length > 0 ) {
      setNumero( quarteirao.numero );
      setLocalidade( {
        value: quarteirao.localidade.id,
        label: quarteirao.localidade.nome
      } );
      setLados(
        quarteirao.lados.map( l => ( {
          id            : l.id,
          numero        : l.numero,
          localidade_id : quarteirao.localidade.id,
          rua_id        : l.rua.id,
          logradouro    : l.rua.nome,
          cep           : l.rua.cep,
          outro         : "",
          imoveis       : l.imoveis
        } ) )
      );
    }
  }

  /**
   * Esta função seta o imóvel clicado para exclusão e armazena na variável imovelExcluir
   * para caso o modal excluir imovel acione a função excluirImovel passando true.
   * @param {Imovel} imovel modelo de Imóvel
   * @return void
   */
  const openModalDeleteHouse = imovel => {
    setImovelExcluir( imovel );
    setShowModalExcluirImovel( true );
  }

  /**
   * Quando esta função é acionada significa que o modal de excluir imóvel foi
   * confirmado ou cancelado pelo usuário, em caso de confirmacao = true é acionado
   * a requisição de exclusão via API.
   * 
   * @param {boolean} confirmacao resposta do modal excluir imovel
   * @return void
   */
  const excluirImovel = confirmacao => {
    if( confirmacao ) {
      props.excluirImovelRequest( imovelExcluir.id, imovelExcluir.lado_id );

      setShowModalExcluirImovel( false );
      setImovelExcluir( new Imovel );
    }
  }

  /**
   * Abrir o model para cadastro de imóvel
   * @param {Model} imovel
   */
  const showCadastrarImovel = () => {
    setAcao( 'cadastrar' );
    setShowImovel( true );
  }

  /**
   * Abrir o model de edição de imóvel
   * @param {Model} imovel
   */
  const showEditarImovel = imovel => {
    setAcao( 'editar' );
    props.setImovelEditar( imovel );
    setShowImovel( true );
  }
  
  /**
   * Abrir o modal de cadastro/edição de um lado
   * @param {Model} lado
   */
  const showModalLado = ( acao, lado = {} ) => {
    setAcao( acao );
    setShowLado( true );
  }

  /**
   * Função para fechar o model de lado
   */
  const fecharModalLado = () => {
    setShowLado( false );
  }

  /**
   * Função para fechar o model de imóvel
   */
  const fecharModalImovel = () => {
    setShowImovel( false );
  }

  /**
   * Função de atualização do quarteirão
   * @param {Object} e elemento que chamou esta função
   * @return void
   */
  function handleSubmit( e ) {
    e.preventDefault();
    const quarteirao = new Quarteirao( {
      id            : parseInt( id ),
      numero,
      localidade_id : localidade.value, 
      zona_id       : zona.value,
      ativo         : true,
      quarteirao_id : null,
      lados
    } );

    props.setQuarteiraoRequest( quarteirao );
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><BorderAllIcon /></PageIcon>
          Editar Quarteirão
        </h3>
      </PageHeader>
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">Quarteirão: <mark className="bg-info text-white" >{ quarteirao.numero }</mark></h4>
              <p className="text-description">
                Atenção os campos com <code>*</code> são obrigatórios
              </p>
              <Row>
                <Col sm='6'>
                  <form onSubmit={ handleSubmit } >
                    <h4 className="title">Informações Do Quarteirão</h4>
                    <Row>
                      <Col sm='6'>
                        <FormGroup>
                          <label htmlFor="localidade">Localidade <code>*</code></label>
                          <Select
                            id="localidade"
                            value={ localidade }
                            styles={ selectDefault }
                            options={ optionLocalidade }
                            onChange={ e => { setLocalidade(e); }}
                            required />
                        </FormGroup>
                      </Col>
                      <Col sm='6'>
                        <FormGroup>
                          <label htmlFor="zona">Zona</label>
                          <Select
                            id="zona"
                            value={ zona }
                            styles={ selectDefault }
                            options={ optionZona }
                            onChange={ e => { setZona(e); } }
                            required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label htmlFor="numero">Número <code>*</code></label>
                          <input
                            id="numero"
                            value={ numero ? numero : "" }
                            type="number"
                            className="form-control"
                            onChange={ e => setNumero( e.target.value ) }
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label>Lados</label>
                          <Lista>
                            {
                              lados.map( ( l, index ) => (
                                <ListaItem key={ `lado-${ l.id }` } className="pt-0 pb-0 justify-content-between">
                                  <div>
                                    <ListaIcon className="mr-2"><FaBorderAll /></ListaIcon>
                                    <span className="mr-2">Lado nº { l.numero } - Rua: { l.logradouro }</span>
                                  </div>

                                  <ButtonClose
                                    title="Excluir lado"
                                    onClick={ () => showModalExcluirLado( index ) }
                                    className="ml-2 text-danger"
                                  />
                                </ListaItem>
                              ) )
                            }
                          </Lista>
                          <Row>
                            <Col className="text-right">
                              <Fab
                                className="bg-success text-white"
                                size="medium"
                                aria-label="Cadastrar um novo lado"
                                onClick={ () => showModalLado( 'cadastrar' ) }
                              >
                                <AddBox />
                              </Fab>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>

                    <ContainerFixed>
                      <ButtonSave
                        title="Salvar"
                        className="bg-info text-white"
                        type="submit" 
                      />
                    </ContainerFixed>
                  </form>
                </Col>

                <Col sm='6'>
                  <h4 className="title">
                    Imóveis
                    <ButtonNewObject title="Cadastrar Imóvel" onClick={ showCadastrarImovel } />
                  </h4>

                  {/* Listando os imóveis do quarteirão */}
                  {
                    lados.map( (l, index) => {
                      const [bg, text] = l.id ? ["", "text-muted"] : ["bg-success", "text-white"];
                      return (
                        <Accordion key={ index } className={"expansion " + bg}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={"panel-side-content" + l.id}
                            id={"panel-side-" + l.id}
                          >
                            <PanelTitle>
                              <p>Lado nº <mark className="bg-info text-white">{ l.numero }</mark></p>
                              <small className={ text }>{ l.logradouro }</small>
                            </PanelTitle>
                          </AccordionSummary>
                          <AccordionDetails>
                            <ListaImoveis
                              lado={ l }
                              editar={ showEditarImovel }
                              deletar={ openModalDeleteHouse }
                            />
                          </AccordionDetails>
                        </Accordion>
                      )
                    })
                  }
                </Col>
              </Row>
            </div>
          </article>
        </div>

        {/* Modais de ação */}
        <ModalLado 
          lado        ={ {} } 
          ruas        ={ ruas }
          show        ={ showLado }
          handleClose ={ fecharModalLado } 
          acao        ={ 'cadastrar' } // cadastrar ou editar
          addLado     ={ addLado }
        />
        <ModalExcluirLado
          lados       ={ lados }
          ladoIndex   ={ ladoIndex }
          show        ={ showExcluirLado }
          handleClose ={ hideModalExcluirLado }
        />
        <ModalImovel 
          show        ={ showImovel }
          handleClose ={ fecharModalImovel } 
          lados       ={ lados } 
          imovel      ={ imovel }
          acao        ={ acao } // cadastrar ou editar
        />
        {/* Modal de confirmação de exclusão de imóvel */}
        <ModalConfirmacao
          title="Excluir imóvel"
          show={ showModalExcluirImovel }
          handleClose={ () => setShowModalExcluirImovel( false ) }
          confimed={ excluirImovel }
        >
          <p>Deseja excluir o imóvel nº { imovelExcluir.numero }?</p>
        </ModalConfirmacao>
      </section>
    </>
  );
}

/**
 * Lista de imóveis
 * @param {*} lado lado do quarteirão ao qual a lista está sendo inserida
 * @param {*} editar ação a ser chamada para editar o imóvel
 * @param {*} deletar ação a ser chamada para apagar o imóvel
 * @returns 
 */
function ListaImoveis({ lado, editar: editarAction, deletar: deletarAction }) {
  let imoveis = [];

  let listImoveis = lado.imoveis ?
    lado.imoveis.map( ( i, index ) => {
      imoveis.push(
        new Imovel( {
          id          : i.id,
          lado_id     : i.lado_id,
          numero      : lado.numero,
          logradouro  : lado.logradouro,
          numero      : i.numero,
          sequencia   : i.sequencia,
          responsavel : i.responsavel,
          complemento : i.complemento,
          tipoImovel  : i.tipoImovel,
          lat         : i.lat ? parseFloat( i.lat ) : null,
          lng         : i.lng ? parseFloat( i.lng ) : null,
        } )
      );

      return (
        <LiHouse key={ index }>
          <Container onClick={ () => editarAction( imoveis[ index ] ) } >
            <ContainerIcon className="ContainerIcon" >
              <IoIosHome />
            </ContainerIcon>
            <DivDescription>
              <div>
                <span className="mr-2">Nº: { i.numero }</span>
                {
                  i.sequencia ?
                    <span>Seq.: { i.sequencia === -1 ? "" : i.sequencia }</span> :
                    <div />
                }
              </div>
            </DivDescription>
          </Container>
          <ButtonClose
            title="Excluir imóvel"
            onClick={ () => deletarAction( new Imovel( {
              id      : i.id,
              lado_id : i.lado_id,
              numero  : i.numero
            } ) ) }
            className="ml-2 text-danger"
          />
        </LiHouse>
      );
    } ) : []

  if( listImoveis.length === 0 ) {
    listImoveis = <LiHouse className="p-2"><h4 className="title w-100 text-center m-0">Nenhum imóvel cadastrado</h4></LiHouse>
  }

  return (
    <UlHouse>
      { listImoveis }
    </UlHouse>
  );
}

/**
 * Mapeia o estado global da aplicação a propriedade do componente
 * @param {Object} state estado global
 * @returns 
 */
const mapStateToProps = state => ( {
  usuario     : state.appConfig.usuario,
  municipio_id: state.appConfig.usuario.municipio.id,
  quarteirao  : state.quarteirao.quarteirao,
  localidades : state.localidade.localidades,
  zonas       : state.zona.zonas,
  ruas        : state.rua.ruas,
  imovel      : state.quarteirao.imovel,
  updated     : state.quarteirao.updated,
  reload      : state.quarteirao.reload
} );

/**
 * Mapeia ações a propriedade do componente
 * @param {*} dispatch 
 * @returns 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getQuarteiraoPorIdRequest,
    getLocationByCityRequest,
    getZoneByLocalityRequest,
    getZoneByCityRequest,
    getStreetByLocalityRequest,
    setImovelEditar,
    excluirImovelRequest,
    setQuarteiraoRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( EditarQuarteirao );
