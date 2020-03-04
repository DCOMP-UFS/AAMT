/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../../components/ButtonSave';
import ButtonNewObject from '../../../components/ButtonNewObject';
import Fab from '@material-ui/core/Fab';
import AddBox from '@material-ui/icons/AddBox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModalAddHouse from './ModalAddHouse';
import ModalDeleteHouse from './ModalDeleteHouse';
import ModalUpdateHouse from './ModalUpdateHouse';
import { IoIosHome } from 'react-icons/io';
import ButtonClose from '../../../components/ButtonClose';
import $ from 'jquery';
import BorderAllIcon from '@material-ui/icons/BorderAll';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarSupervisor';
import { getByIdRequest } from '../../../store/actions/QuarteiraoActions';
import { getLocationByCityRequest } from '../../../store/actions/LocalidadeActions';
import { getZoneByLocalityRequest } from '../../../store/actions/ZonaActions';
import { getStreetByLocalityRequest } from '../../../store/actions/RuaActions';
import { changeImovelSelect } from '../../../store/actions/supportInfo';

// STYLES
import {
  ContainerSide,
  PanelTitle,
  UlHouse,
  LiHouse,
  ContainerIcon,
  DivDescription,
  Span,
  Container
} from './styles';
import { FormGroup, selectDefault } from '../../../styles/global';
import { ContainerFixed, PageIcon, PageHeader } from '../../../styles/util';

function EditarQuarteirao({ quarteirao, municipio_id, ...props }) {
  const [ id ] = useState(props.match.params.id);
  const [ numero, setNumero ] = useState( null );
  const [ lado, setLado ] = useState({
    numero: null,
    localidade_id: null,
    rua_id: null,
    logradouro: "",
    cep: "",
    outro: ""
  });
  const [ lados, setLados ] = useState([]);
  const [ localidade, setLocalidade ] = useState({});
  const [ optionLocalidade, setOptionLocalidade ] = useState([]);
  const [ zona, setZona ] = useState({});
  const [ optionZona, setOptionZona ] = useState([]);
  const [ rua, setRua ] = useState({ value: null });
  const [ optionRua, setOptionRua ] = useState([]);
  const [ numeroLado, setNumeroLado ] = useState( null );
  const [ outra, setOutra ] = useState( "" );
  const [ cep, setCep ] = useState( "" );

  useEffect(() => {
    props.changeSidebar(1, 0);
    props.getByIdRequest( id );
    props.getLocationByCityRequest( municipio_id );
  }, []);

  useEffect(() => {
    loadInfo();
  }, [ quarteirao ]);

  function loadInfo() {
    if( Object.entries( quarteirao ).length > 0 ) {
      setNumero( quarteirao.numero );
      setLocalidade({
        value: quarteirao.zona.localidade.id,
        label: quarteirao.zona.localidade.nome
      });
      setLados(
        quarteirao.lados.map( l => ({
          id: l.id,
          numero: l.numero,
          localidade_id: quarteirao.zona.localidade.id,
          rua_id: l.rua.id,
          logradouro: l.rua.nome,
          cep: l.rua.cep,
          outro: "",
          imoveis: l.imoveis
        }))
      );
    }
  }

  useEffect(() => {
    const options = props.localidades.map(( l ) => ({ value: l.id, label: l.nome }));

    setOptionLocalidade( options );
  }, [ props.localidades ]);

  useEffect(() => {
    const options = props.zonas.map(( z ) => {
      if( z.id === quarteirao.zona.id )
        setZona({ value: z.id, label: z.nome });

      return ({ value: z.id, label: z.nome })
    });

    setOptionZona( options );
  }, [ props.zonas ]);

  useEffect(() => {
    const options = props.ruas.map(( r ) => ({ value: r.id, label: r.nome, cep: r.cep }));
    options.push({ value: null, label: "Outra" });

    setOptionRua( options );
  }, [ props.ruas ]);

  useEffect(() => {
    if( Object.entries( localidade ).length > 0 ) {
      setLado({ ...lado, localidade_id: localidade.value });
      props.getZoneByLocalityRequest( localidade.value );
      props.getStreetByLocalityRequest( localidade.value );

      setZona({});
    }
  }, [ localidade ]);

  function addSide() {
    const l = {
      numero: numeroLado,
      localidade_id: localidade.value,
      rua_id: rua.value,
      logradouro: rua.label,
      cep: rua.cep ? rua.cep : cep,
      outro: outra
    };

    setRua({ value: null });
    setNumeroLado( null );
    setCep("");
    setOutra("");

    setLados( [...lados, l] );
  }

  useEffect(() => {
    loadInfo();
  }, [ props.updated ]);

  function openModalDeleteHouse(
    id,
    lado_id,
    lado_numero,
    logradouro,
    imovel_numero,
    sequencia,
    responsavel,
    complemento,
    tipoImovel
  ) {
    props.changeImovelSelect( id, lado_id, lado_numero, logradouro, imovel_numero, sequencia, responsavel, complemento, tipoImovel );
    $('#modal-excluir-imovel').modal('show');
  }

  function openModalUpdateHouse(
    id,
    lado_id,
    lado_numero,
    logradouro,
    imovel_numero,
    sequencia,
    responsavel,
    complemento,
    tipoImovel
  ) {
    props.changeImovelSelect( id, lado_id, lado_numero, logradouro, imovel_numero, sequencia, responsavel, complemento, tipoImovel );
    $('#modal-editar-imovel').modal('show');
  }

  function handleSubmit( e ) {
    e.preventDefault();
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
                          <label htmlFor="zona">Zona <code>*</code></label>
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
                          <label>Lados <code>*</code></label>
                          <ContainerSide>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <label htmlFor="rua">Rua <code>*</code></label>
                                  <Select
                                    id="rua"
                                    value={ rua }
                                    styles={ selectDefault }
                                    options={ optionRua }
                                    onChange={ e => setRua( e ) }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm='6'>
                                <FormGroup>
                                  <label htmlFor="cep">CEP</label>
                                  <input
                                    id="cep"
                                    value={ cep }
                                    className="form-control"
                                    onChange={ e => setCep( e.target.value ) }
                                    disabled={ rua.value ? true : false }
                                  />
                                </FormGroup>
                              </Col>
                              <Col sm='6'>
                                <FormGroup>
                                  <label htmlFor="outra">Outra</label>
                                  <input
                                    id="outra"
                                    value={ outra }
                                    className="form-control"
                                    onChange={ e => setOutra( e.target.value ) }
                                    disabled={ rua.value ? true : false }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <label htmlFor="numeroLado">Número do lado <code>*</code></label>
                                  <input
                                    id="numeroLado"
                                    value={ numeroLado ? numeroLado : "" }
                                    type="number"
                                    className="form-control"
                                    onChange={ e => setNumeroLado( e.target.value ) }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="text-right">
                                <Fab
                                  className="bg-success text-white"
                                  size="medium"
                                  aria-label="add"
                                  onClick={ addSide }
                                >
                                  <AddBox />
                                </Fab>
                              </Col>
                            </Row>
                          </ContainerSide>
                        </FormGroup>
                      </Col>
                    </Row>

                    <ContainerFixed>
                      <ButtonSave
                        title="Salvar"
                        className="bg-info text-white"
                        type="submit" />
                    </ContainerFixed>
                  </form>
                </Col>

                <Col sm='6'>
                  <h4 className="title">
                    Imóveis
                    <ButtonNewObject
                      title="Cadastrar Imóvel"
                      data-toggle="modal"
                      data-target="#modal-novo-imovel"
                    />
                  </h4>

                  {
                    lados.map( (l, index) => {
                      const [bg, text] = l.id ? ["", "text-muted"] : ["bg-success", "text-white"];
                      return (
                        <ExpansionPanel key={ index } className={"expansion " + bg}>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={"panel-side-content" + l.id}
                            id={"panel-side-" + l.id}
                          >
                            <PanelTitle>
                              <p>Lado nº <mark className="bg-info text-white">{ l.numero }</mark></p>
                              <small className={ text }>{ l.logradouro }</small>
                            </PanelTitle>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <ListHouse
                              lado={ l }
                              update={ openModalUpdateHouse }
                              delete={ openModalDeleteHouse }
                            />
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      )
                    })
                  }

                  <ModalAddHouse lados={ lados } />
                  <ModalUpdateHouse lados={ lados } />
                  <ModalDeleteHouse />
                </Col>
              </Row>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function ListHouse({ lado, update: updateAction, delete: deleteAction }) {
  let listImoveis = lado.imoveis ?
    lado.imoveis.map( (i, index) => (
      <LiHouse key={ index }>
        <Container
          onClick={ () => updateAction(
              i.id,
              i.lado_id,
              lado.numero,
              lado.logradouro,
              i.numero,
              i.sequencia,
              i.responsavel,
              i.complemento,
              i.tipoImovel
            )
          }
        >
          <ContainerIcon className="ContainerIcon" >
            <IoIosHome />
          </ContainerIcon>
          <DivDescription>
            <div>
              <span className="mr-2">Nº: { i.numero }</span>
              <span>Seq.: { i.sequencia === -1 ? "" : i.sequencia }</span>
            </div>
            <Span>Responsável: { i.responsavel }</Span>
          </DivDescription>
        </Container>
        <ButtonClose
          title="Excluir imóvel"
          onClick={ () => deleteAction(
              i.id,
              i.lado_id,
              lado.numero,
              lado.logradouro,
              i.numero,
              i.sequencia,
              i.responsavel,
              i.complemento,
              i.tipoImovel
            )
          }
          className="ml-2 text-danger"
        />
      </LiHouse>
    )) : []

  if( listImoveis.length === 0 ) {
    listImoveis = <LiHouse className="p-2"><h4 className="title w-100 text-center m-0">Nenhum imóvel cadastrado</h4></LiHouse>
  }

  return (
    <UlHouse>
      { listImoveis }
    </UlHouse>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  quarteirao: state.quarteirao.quarteirao,
  localidades: state.localidade.localidades,
  zonas: state.zona.zonas,
  ruas: state.rua.ruas,
  updated: state.quarteirao.updated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getByIdRequest,
    getLocationByCityRequest,
    getZoneByLocalityRequest,
    getStreetByLocalityRequest,
    changeImovelSelect
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarQuarteirao);
