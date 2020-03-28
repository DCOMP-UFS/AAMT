import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import $ from 'jquery';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';

// ACTIONS
import { addEquipe } from '../../../../../store/actions/AtividadeActions';

// STYLES
import { UlEquipe, LiEquipe, ContainerCheck, DivDescription, LiEmpty, Arrows } from './styles';
import { ContainerArrow } from '../../../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../../../styles/global';

function ModalEquipe({ ...props }) {
  const [ membros, setMembros ] = useState([]);
  const [ membrosSelecionados, setMembrosSelecionados ] = useState([]);
  const [ reload, setReload ] = useState( false );
  const [ supervisor, setSupervisor ] = useState({});
  const [ optionSupervisor, setOptionSupervisor ] = useState([]);
  const [ message, setMessage ] = useState("");
  const [ messageMembro, setMessageMembro ] = useState("");

  useEffect(() => {
    const m = props.membros.map( m => ({
      id: m.id,
      nome: m.nome,
      checked: false
    }));

    setMembros( m );
  }, [ props.membros ]);

  useEffect(() => {
    setOptionSupervisor(
      membrosSelecionados.map( m => ({
        value: m.id, label: m.nome
      }))
    );
  }, [ membrosSelecionados ]);

  function addMembro() {
    let mSelecionado = membros
      .filter( m => m.checked ? m.checked : false )
      .map( m => ({ ...m, checked: false }) );
    let m = membros.filter( m => m.checked ? !m.checked : true );

    setMembrosSelecionados([ ...membrosSelecionados, ...mSelecionado ]);
    setMembros( m );
  }

  function removeMembro() {
    let m = membrosSelecionados
      .filter( m => m.checked ? m.checked : false )
      .map( m => {
        if( m.id === supervisor.value )
          setSupervisor({});

        return ({ ...m, checked: false })
      });
    let mSelecionado = membrosSelecionados.filter( m => m.checked ? !m.checked : true );

    setMembrosSelecionados( mSelecionado );
    setMembros([ ...membros, ...m ]);
  }

  function handleMembro( index ) {
    let m = membros;

    if( m[ index ].checked ) {
      m[ index ].checked = !m[ index ].checked;
    }else {
      m[ index ].checked = true;
    }

    setMembros( m );
    setReload( !reload );
  }

  function handleMembroSelecionado( index ) {
    let m = membrosSelecionados;

    if( m[ index ].checked ) {
      m[ index ].checked = !m[ index ].checked;
    }else {
      m[ index ].checked = true;
    }

    setMembrosSelecionados( m );
    setReload( !reload );
  }

  function dbClickMembro( index ) {
    let m = membros.filter( (m, i) => i !== index );

    setMembrosSelecionados([ ...membrosSelecionados, membros[ index ] ]);
    setMembros( m );
  }

  function dbClickMembroSelecionado( index ) {
    let m = membrosSelecionados.filter( (m, i) => i !== index );

    setMembros([ ...membros, membrosSelecionados[ index ] ]);
    setMembrosSelecionados( m );

    if( membrosSelecionados[ index ].id === supervisor.value )
      setSupervisor({});
  }

  function clearInput() {
    const m = props.membros.map( m => ({
      id: m.id,
      nome: m.nome,
      checked: false
    }));

    setMembros( m );
    setMembrosSelecionados([]);
    setSupervisor({});
  }

  function handleSubmit( e ) {
    e.preventDefault();

    if( membrosSelecionados.length === 0 ) {
      setMessageMembro("Adicione ao menos um membro a equipe");
      setTimeout(() => setMessageMembro("") , 3000);
    } else if( !supervisor.value ) {
      setMessage("Escolha o supervisor da equipe");
      setTimeout(() => setMessage("") , 3000);
    } else {
      props.addEquipe( membrosSelecionados, {
        id: supervisor.value,
        nome: supervisor.label
      });

      const m = props.membros.map( m => ({
        id: m.id,
        nome: m.nome,
        checked: false
      }));

      setMembros( m );
      setMembrosSelecionados([]);
      setSupervisor({});
      $('#modal-novo-equipe').modal('hide');
    }
  }

  return (
    <Modal
      id="modal-novo-equipe"
      title="Planejar Equipe"
      size="lg"
    >
      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <Row>
            <Col sm="5">
              <FormGroup>
                <label>Membro(s)</label>
                <ListMembros
                  membros={ membros }
                  onClick={ handleMembro }
                  onDoubleClick={ dbClickMembro }
                />
              </FormGroup>
            </Col>
            <Col sm="2">
              <Arrows>
                <IconButton
                  className="text-success"
                  aria-label="cart"
                  onClick={ addMembro }
                >
                  <FaLongArrowAltRight />
                </IconButton>
                <IconButton
                  className="text-danger"
                  aria-label="cart"
                  onClick={ removeMembro }
                >
                  <FaLongArrowAltLeft />
                </IconButton>
              </Arrows>
            </Col>
            <Col sm="5">
              <FormGroup>
                <label>
                  Supervisor <span className="text-danger">{ message }</span>
                </label>
                <Select
                  id="supervisor"
                  value={ supervisor }
                  styles={ selectDefault }
                  options={ optionSupervisor }
                  onChange={ e => setSupervisor( e ) }
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>
                  Selecionado(s) <span className="text-danger">{ messageMembro }</span>
                </label>
                <ListMembros
                  membros={ membrosSelecionados }
                  onClick={ handleMembroSelecionado }
                  onDoubleClick={ dbClickMembroSelecionado }
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

function ListMembros( props ) {
  const membros = props.membros;
  const handleMembro = props.onClick;
  const dbClickMembro = props.onDoubleClick;
  let li = [];

  if( membros ) {
    li = membros.map( (m, index) => (
      <LiEquipe
        key={ m.id }
        onClick={ () => handleMembro( index ) }
        onDoubleClick={ () => dbClickMembro( index ) }
      >
        <ContainerCheck>
          <Checkbox
            checked={ m.checked ? m.checked : false }
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </ContainerCheck>
        <DivDescription>
          <div>
            <span className="mr-2">
              { m.tipo === "quarteirao" ? `Nº ${ m.nome }` : m.nome }
            </span>
          </div>
        </DivDescription>
      </LiEquipe>
    ));
  }

  if( membros.length === 0) {
    li = [
      <LiEmpty key={ 0 }>
        <h4>Nenhum membro</h4>
      </LiEmpty>
    ]
  }

  return (
    <UlEquipe>
      { li }
    </UlEquipe>
  );
}

const mapStateToProps = state => ({
  membros: state.usuario.usuarios
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addEquipe }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEquipe);
