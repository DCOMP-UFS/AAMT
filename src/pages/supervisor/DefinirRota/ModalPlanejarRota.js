import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import ButtonNewObject from '../../../components/ButtonNewObject';
import ButtonClose from '../../../components/ButtonClose';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { addRoute, removeRoute, changeRouteUser, addSideRoute, removeSideRoute } from '../../../store/actions/DefinirRotaActions';
import { saveRoutes } from '../../../store/actions/DefinirRotaCacheActions';
import { showNotifyToast } from '../../../store/actions/appConfig';

import { ContainerBlock, MemberRoutes } from './styles';
import { Button } from '../../../styles/global';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 138
  }
}));

function ModalPlanejarRota({ planejamento, planejamentoIndex, usuario, ...props }) {
  const classes = useStyles();
  const [ routerIndex, setRouterIndex ] = useState( -1 );

  const handleChange = (event, index) => {
    props.changeRouteUser( event.target.value, index );
  };

  function getDateBr() {
    const data = new Date();
    let dia  = data.getDate().toString();
    dia = (dia.length === 1) ? '0'+dia : dia;
    let mes  = (data.getMonth()+1).toString(); //+1 pois no getMonth Janeiro começa com zero.
    mes = (mes.length === 1) ? '0'+mes : mes;
    let ano = data.getFullYear();

    return `${ dia }/${ mes }/${ ano }`;
  }

  function checkQtdRota() {
    const qtdUsuarios = planejamento[ planejamentoIndex ].membros.filter( m => m.usuario.id !== usuario.id ).length;
    const qtdRotas = planejamento[ planejamentoIndex ].rotas.length;

    if( qtdRotas < qtdUsuarios )
     {
      props.addRoute();

      if( routerIndex === -1 )
        setRouterIndex( 0 )
    }
  }

  function toggleSide( event, sideIndex, blockIndex ) {
    if( routerIndex > -1 ) {
      const element = $( event.target );
      const fl_disabled = element.hasClass("disabled");

      if( !fl_disabled ) {
        if( element.hasClass("selected") ) {
          element.toggleClass("selected");
          props.removeSideRoute( blockIndex, sideIndex, routerIndex );
        } else {
          element.toggleClass("selected");
          props.addSideRoute( blockIndex, sideIndex, routerIndex );
        }
      }
    }
  }

  function checkRotas() {
    const rotas = planejamento[ planejamentoIndex ].rotas;

    if( rotas.length ) {
      let fl_rotaValida = true;

      rotas.forEach( r => {
        if( r.usuario_id === -1 )
          fl_rotaValida = false;
      });

      if( fl_rotaValida ) {
        props.saveRoutes( planejamento[ planejamentoIndex ] );
        $('#modal-planejar-rota').modal('hide');
        props.showNotifyToast('Rotas salvas em cache', 'success');
      }else {
        props.showNotifyToast('Todas as rotas devem conter um agente', 'warning');
      }
    } else {
      props.showNotifyToast('Planeje pelo menos uma rota', 'warning');
    }
  }

  function removerRota( index ) {
    props.removeRoute( index );

    setRouterIndex( -1 );
  }

  return (
    <Modal
      id="modal-planejar-rota"
      title={ planejamentoIndex > -1 ? `Planejar Rotas - Equipe ${ planejamento[ planejamentoIndex ].idEquipe }` : ""}
      size="xl"
      backdrop="static">
      <ModalBody>
        <Row>
          <Col md="3" className="border-right-temp">
            <h4 className="title">
              Rotas: { getDateBr() }
              <ButtonNewObject title="Nova Rota" onClick={ checkQtdRota } />
            </h4>
            <MemberRoutes>
              {
                planejamentoIndex > -1 ?
                  planejamento[ planejamentoIndex ].rotas.map( ( r, index ) => (
                    <li
                      key={ index }
                      className={ index === routerIndex ? "show" : "" }>
                      <span onClick={ () => setRouterIndex( index ) }>
                        <mark className="bg-success">{ index < 9 ? "0" + (index + 1) : (index + 1) }</mark>
                        <FormControl className={classes.formControl}>
                          <Select
                            value={ r.usuario_id }
                            onChange={ (event) => handleChange( event, index ) }
                            displayEmpty
                          >
                            <MenuItem value="">
                              <em>Selecione</em>
                            </MenuItem>
                            {
                              planejamento[ planejamentoIndex ].membros.filter( m => m.usuario.id !== usuario.id ).map( ( m, index ) => (
                                <MenuItem key={ index } value={ m.usuario.id }>{ m.usuario.nome }</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </span>
                      <ButtonClose
                        title="Excluir Rota"
                        onClick={ () => removerRota( index ) }
                        className="ml-2 text-danger"
                      />
                    </li>
                  )) :
                  ""
              }
            </MemberRoutes>
          </Col>
          <Col md="9">
            <ContainerBlock>
              {
                planejamentoIndex > -1 ?
                  (
                    planejamento[ planejamentoIndex ].quarteiroes.map(( q, qIndex ) => (
                      <div key={ qIndex } className="block">
                        <label>Quarteirão: Nº { q.numero }</label>

                        <ul className="sides">
                          {/* <li className="selected">Rua 01</li> */}
                          {
                            q.lados.map(( l, lIndex ) => (
                              <li
                                key={ lIndex }
                                className={
                                  l.rotaIndex > -1 && l.rotaIndex === routerIndex ?
                                    "selected" :
                                    l.rotaIndex > -1 ?
                                      "disabled":
                                      ""
                                  }
                                onClick={ e => toggleSide( e, lIndex, qIndex ) }>
                                  <Checkbox
                                    defaultChecked
                                    color="default"
                                    className="p-0 pr-2"
                                    checked={
                                      l.rotaIndex > -1 && l.rotaIndex === routerIndex ?
                                        true :
                                        l.rotaIndex > -1 ?
                                          true : false
                                    }
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                  />
                                { l.rua.nome }
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    ))
                  ) :
                  ""
              }
            </ContainerBlock>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
        <Button type="button" onClick={ checkRotas }>Salvar Rotas</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario,
  planejamento: state.definirRota.planejamento,
  planejamentoIndex: state.definirRota.planejamentoIndex,
  reload: state.definirRota.reload
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    showNotifyToast,
    addRoute,
    removeRoute,
    changeRouteUser,
    addSideRoute,
    removeSideRoute,
    saveRoutes
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalPlanejarRota );
