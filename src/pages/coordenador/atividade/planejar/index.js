/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IoIosPaper } from 'react-icons/io';
import { Row, Col } from 'react-bootstrap';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonNewObject from '../../../../components/ButtonNewObject';
import { FaThumbtack, FaUser, FaTrash, FaMapSigns } from 'react-icons/fa';
import { abrangencia as abrangenciaEnum, responsabilidadeAtividade } from '../../../../config/enumerate';
import ModalEstrato from './ModalEstrato';
import ModalEquipe from './ModalEquipe';
import ButtonSave from '../../../../components/ButtonSave';
import { ModalConfirm } from '../../../../components/Modal';
import $ from 'jquery';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebar';
import { getActivitieByIdRequest, getLocationsRequest } from '../../../../store/actions/AtividadeActions';
import { getUsersByCityRequest } from '../../../../store/actions/UsuarioActions';
import { removeEstrato, removeEquipe, planActivityRequest } from '../../../../store/actions/AtividadeActions';

// STYLES
// import { ContainerMap } from './styles';
import {
  FormGroup,
  UlIcon,
  LiIcon,
  LiEmpty,
  ContainerIcon,
  DivDescription
} from '../../../../styles/global';
import { PageIcon, PageHeader, ContainerFixed } from '../../../../styles/util';

function PlanejarAtividade({ atividade, estratos, equipes, ...props }) {
  const [ id ] = useState(props.match.params.id);
  const [ objetivoAtividade, setObjetivoAtividade ] = useState("");
  const [ abrangencia, setAbrangencia ] = useState(undefined);
  const [ situacao, setSituacao ] = useState(undefined);
  const [ responsabilidade, setResponsabilidade ] = useState(undefined);
  const [ flTodosImoveis, setFlTodosImoveis ] = useState(false);
  const [ metodologia, setMetodologia ] = useState({
    sigla: ""
  });
  const [ objetivo, setObjetivo ] = useState({});
  const [ mensageEstrato, setMensageEstrato ] = useState("");
  const [ mensageEquipe, setMensageEquipe ] = useState("");

  useEffect(() => {
    props.changeSidebar(1, 1);
    props.getActivitieByIdRequest( id );
    props.getUsersByCityRequest( props.municipio_id );
  }, []);

  useEffect(() => {
    if( Object.entries( atividade ).length > 0 ) {
      setObjetivoAtividade( atividade.objetivoAtividade );
      setAbrangencia(
        Object.entries( abrangenciaEnum )
          .filter(([ attr, data ]) => data.id === atividade.abrangencia )[0][1].label
      );
      setSituacao( atividade.situacao );
      setResponsabilidade(
        Object.entries( responsabilidadeAtividade )
          .filter(([ attr, data ]) => data.id === atividade.responsabilidade )[0][1].label
      );
      setFlTodosImoveis( atividade.flTodosImoveis );
      setMetodologia( atividade.metodologia );
      setObjetivo( atividade.objetivo );

      props.getLocationsRequest( atividade.abrangencia, props.municipio_id );
    }
  }, [ atividade ]);

  function handleSubmit( e ) {
    e.preventDefault();

    if( estratos.length === 0 ) {
      setMensageEstrato("Planeje ao menos um estrato");
      setTimeout(() => setMensageEstrato(""), 3000);
    } else if( equipes.length === 0 ) {
      setMensageEquipe("Planeje ao menos uma equipe");
      setTimeout(() => setMensageEquipe(""), 3000);
    }else {
      $('#modal-confirmar-planejamento').modal('show');
    }
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><IoIosPaper /></PageIcon>
          Planejamento da Atividade
        </h3>
      </PageHeader>
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">{ metodologia.sigla }</h4>
              <p className="text-description">
                { objetivoAtividade }
              </p>

              <form onSubmit={ handleSubmit } >
                <ContainerFixed>
                  <ButtonSave
                    title="Salvar"
                    className="bg-info text-white"
                    type="submit" />
                </ContainerFixed>
                <ModalConfirm
                  id="modal-confirmar-planejamento"
                  title="Confirmar planejamento"
                  confirm={() => props.planActivityRequest( id, estratos, equipes, atividade.abrangencia ) }
                >
                  <p>Deseja salvar o planjemaneot? A atividade uma vez planejada não poderá ser editada</p>
                </ModalConfirm>

                <Row>
                  <Col sm='6'>
                    <FormGroup>
                      <label>Metodologia <code>*</code></label>
                      <input
                        value={ metodologia.nome || "" }
                        className="form-control"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col sm='6'>
                    <FormGroup>
                      <label>Atividade <code>*</code></label>
                      <input
                        value={ objetivo.descricao || "" }
                        className="form-control"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <label>Realizar a atividade em todos os imóveis? <code>*</code></label>
                      <input
                        value={ flTodosImoveis ? "Sim" : "Não" }
                        className="form-control"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <label>Abrangência <code>*</code></label>
                      <input
                        value={ abrangencia || "" }
                        className="form-control"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <label>Responsabilidade <code>*</code></label>
                      <input
                        value={ responsabilidade || "" }
                        className="form-control"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h4>
                      Estrato(s)
                      <ButtonNewObject
                        title="Planejar Estrato"
                        data-toggle="modal"
                        data-target="#modal-novo-estrato"
                      />
                      <span className="text-danger">{ mensageEstrato }</span>
                    </h4>

                    <ListEstrato estratos={ estratos } actionRemove={ props.removeEstrato } />
                  </Col>
                  <Col>
                    <h4>
                      Equipe(s)
                      <ButtonNewObject
                        title="Planejar Equipe"
                        data-toggle="modal"
                        data-target="#modal-novo-equipe"
                      />
                      <span className="text-danger">{ mensageEquipe }</span>
                    </h4>

                    <ListEquipe equipes={ equipes } actionRemove={ props.removeEquipe } />
                  </Col>
                </Row>
              </form>

              <ModalEstrato />
              <ModalEquipe />
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function ListEstrato( props ) {
  const removeEstrato = props.actionRemove;
  const estratos = props.estratos;
  let expansion = [];

  expansion = estratos.map( (e, index) => {
    return (
      <ExpansionPanel className="expansion" key={ index }>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-estrato-content-${ e.id }`}
          id={`panel-estrato-${ e.id }`}
        >
          <p style={{ marginBottom: 0 }}>
            Estrato <mark className="bg-info text-white">{ index + 1 }</mark>
          </p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <UlIcon style={{ width: '100%' }}>
            {
              e.locais.map( ( l, index ) => (
                <LiIcon key={ index }>
                  <ContainerIcon className="ContainerIcon" >
                    <FaThumbtack />
                  </ContainerIcon>
                  <DivDescription>
                    <div>
                      <span className="mr-2">{ l.tipo === "quarteirao" ? `Quarteirão nº ${ l.nome }` : l.nome }</span>
                    </div>
                  </DivDescription>
                </LiIcon>
              ))
            }
          </UlIcon>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <IconButton
            className="text-danger"
            aria-label="cart"
            onClick={() => removeEstrato( index ) }
          >
            <FaTrash className="icon-sm" />
          </IconButton>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  });

  if( estratos.length === 0 ) {
    expansion = [
      <UlIcon key={ 0 }>
        <LiEmpty>
          <h4>Nenhum estrato cadastrado</h4>
        </LiEmpty>
      </UlIcon>
    ];
  }

  return expansion;
}

function ListEquipe( props ) {
  const removeEquipe = props.actionRemove;
  const equipes = props.equipes;
  let expansion = [];

  expansion = equipes.map( (e, index) => {
    return (
      <ExpansionPanel className="expansion" key={ index }>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-equipe-content-${ index }`}
          id={`panel-equipe-${ index }`}
        >
          <p style={{ marginBottom: 0 }}>
            Equipe <mark className="bg-info text-white">{ e.supervisor.nome }</mark>
          </p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="flex-column">
          <Row>
            <Col>
              <FormGroup>
                <label>Membro(s)</label>
                <UlIcon style={{ width: '100%' }}>
                  {
                    e.membros.map( m => (
                      <LiIcon key={ m.id } >
                        <ContainerIcon className="ContainerIcon" >
                          <FaUser />
                        </ContainerIcon>
                        <DivDescription>
                          <div>
                            <span className="mr-2">{ m.nome }</span>
                          </div>
                        </DivDescription>
                      </LiIcon>
                    ))
                  }
                </UlIcon>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label>Locai(s)</label>
                <UlIcon style={{ width: '100%' }}>
                  {
                    e.locais.map( l => (
                      <LiIcon key={ l.id } >
                        <ContainerIcon className="ContainerIcon" >
                          <FaMapSigns />
                        </ContainerIcon>
                        <DivDescription>
                          <div>
                            <span className="mr-2">
                            {
                              l.tipo === "quarteirao" ?
                                `Quarteirão nº ${ l.nome }` :
                              l.tipo === "zona" ?
                                `Zona ${ l.nome }` :
                                `Localidade/Bairro: ${ l.nome }`
                            }
                            </span>
                          </div>
                        </DivDescription>
                      </LiIcon>
                    ))
                  }
                </UlIcon>
              </FormGroup>
            </Col>
          </Row>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <IconButton
            className="text-danger"
            aria-label="cart"
            onClick={ () => removeEquipe( index ) }
          >
            <FaTrash className="icon-sm" />
          </IconButton>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  });

  if( equipes.length === 0 ) {
    expansion = [
      <UlIcon key={ 0 }>
        <LiEmpty>
          <h4>Nenhuma equipe cadastrado</h4>
        </LiEmpty>
      </UlIcon>
    ];
  }

  return expansion;
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  atividade: state.atividade.atividade,
  locais: state.atividade.locais,
  estratos: state.atividade.estratos,
  equipes: state.atividade.equipes,
  reload: state.atividade.reload
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getActivitieByIdRequest,
    getLocationsRequest,
    getUsersByCityRequest,
    removeEstrato,
    removeEquipe,
    planActivityRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( PlanejarAtividade )
