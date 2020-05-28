import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import { Row, Col } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import $ from 'jquery';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';
import { abrangencia as abrangenciaEnum } from '../../../../../config/enumerate';

// ACTIONS
import { addEstrato } from '../../../../../store/actions/AtividadeActions';

// STYLES
import { UlLocal, LiLocal, ContainerCheck, DivDescription, LiEmpty, Arrows } from './styles';
import { ContainerArrow } from '../../../../../styles/util';
import { Button, FormGroup } from '../../../../../styles/global';

function ModalEstrato ({ atividade, ...props }) {
  const [ abrangencia, setAbrangencia ] = useState("");
  const [ locais, setLocais ] = useState([]);
  const [ locaisSelecionados, setLocaisSelecionados ] = useState([]);
  const [ reload, setReload ] = useState( false );

  useEffect(() => {
    if( Object.entries( atividade ).length > 0 ) {
      let abr = Object.entries( abrangenciaEnum )
        .filter(([ attr, data ]) => data.id === atividade.abrangencia )[0][1].label;

      setAbrangencia( abr.split(' ')[1] );
    }
  }, [ atividade ]);

  useEffect(() => {
    const l = props.locais
      .map( ( loc, index ) => ({ ...loc, dataIndex: index }))
      .filter( loc => loc.flEstrato ? !loc.flEstrato : true );

    setLocais( l );
  }, [ props.locais, props.externalReload ]);

  function handleLocal( index ) {
    let l = locais;

    if( l[ index ].checked ) {
      l[ index ].checked = !l[ index ].checked;
    }else {
      l[ index ].checked = true;
    }

    setLocais( l );
    setReload( !reload );
  }

  function handleLocalSelecionado( index ) {
    let l = locaisSelecionados;

    if( l[ index ].checked ) {
      l[ index ].checked = !l[ index ].checked;
    }else {
      l[ index ].checked = true;
    }

    setLocaisSelecionados( l );
    setReload( !reload );
  }

  function addLocal() {
    let lSelecionado = locais
      .filter( l => l.checked ? l.checked : false )
      .map( l => ({ ...l, checked: false }) );
    let l = locais.filter( l => l.checked ? !l.checked : true );

    setLocaisSelecionados([ ...locaisSelecionados, ...lSelecionado ]);
    setLocais( l );
  }

  function removeLocal() {
    let l = locaisSelecionados
      .filter( l => l.checked ? l.checked : false )
      .map( l => ({ ...l, checked: false }) );
    let lSelecionado = locaisSelecionados.filter( l => l.checked ? !l.checked : true );

    setLocaisSelecionados( lSelecionado );
    setLocais([ ...locais, ...l ]);
  }

  function dbClickLocal( index ) {
    let l = locais.filter( (l, i) => i !== index );

    setLocaisSelecionados([ ...locaisSelecionados, locais[ index ] ]);
    setLocais( l );
  }

  function dbClickLocalSelecionado( index ) {
    let l = locaisSelecionados.filter( (l, i) => i !== index );

    setLocais([ ...locais, locaisSelecionados[ index ] ]);
    setLocaisSelecionados(l);
  }

  function clearInput() {
    setLocais( props.locais.map( l => ({ ...l, checked: false }) ) );
    setLocaisSelecionados([]);
  }

  function handleSubmit( e ) {
    e.preventDefault();

    if( locaisSelecionados.length > 0 ) {
      props.addEstrato( locais, locaisSelecionados );
      setLocaisSelecionados([]);
      $('#modal-novo-estrato').modal('hide');
    }
  }

  return (
    <Modal id="modal-novo-estrato" title="Planejar estrato" size="lg">
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <Row>
            <Col sm="5">
              <FormGroup>
                <label>{ abrangencia }</label>
                <ListLocaly
                  locais={ locais }
                  onClick={ handleLocal }
                  onDoubleClick={ dbClickLocal }
                />
              </FormGroup>
            </Col>
            <Col sm="2">
              <Arrows>
                <IconButton
                  className="text-success"
                  aria-label="cart"
                  onClick={ addLocal }
                >
                  <FaLongArrowAltRight />
                </IconButton>
                <IconButton
                  className="text-danger"
                  aria-label="cart"
                  onClick={ removeLocal }
                >
                  <FaLongArrowAltLeft />
                </IconButton>
              </Arrows>
            </Col>
            <Col sm="5">
              <FormGroup>
                <label>Selecionado(s)</label>
                <ListLocaly
                  locais={ locaisSelecionados }
                  onClick={ handleLocalSelecionado }
                  onDoubleClick={ dbClickLocalSelecionado }
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ContainerArrow>
            <div>
              <Button type="button" className="warning" onClick={ clearInput }>Limpar</Button>
            </div>
            <div>
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

function ListLocaly( props ) {
  const locais = props.locais;
  const handleLocal = props.onClick;
  const dbClickLocal = props.onDoubleClick;
  let li = [];

  if( locais ) {
    li = locais.map( (l, index) => (
      <LiLocal
        key={ l.id }
        onClick={ () => handleLocal( index ) }
        onDoubleClick={ () => dbClickLocal( index ) }
      >
        <ContainerCheck>
          <Checkbox
            checked={ l.checked ? l.checked : false }
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </ContainerCheck>
        <DivDescription>
          <div>
            <span className="mr-2">
              { l.tipo === "quarteirao" ? `Nº ${ l.nome }` : l.nome }
            </span>
          </div>
        </DivDescription>
      </LiLocal>
    ));
  }

  if( locais.length === 0) {
    li = [
      <LiEmpty key={ 0 }>
        <h4>Nenhum local</h4>
      </LiEmpty>
    ]
  }

  return (
    <UlLocal>
      { li }
    </UlLocal>
  );
}

const mapStateToProps = state => ({
  atividade: state.atividade.atividade,
  locais: state.atividade.locais,
  externalReload: state.atividade.reload
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addEstrato }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEstrato);
