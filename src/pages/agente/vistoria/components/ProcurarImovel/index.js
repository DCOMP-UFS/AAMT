import React, { useEffect, useState } from 'react';
import { IoIosHome } from 'react-icons/io';
import Select from 'react-select';
import ButtonNewObject from '../../../../../components/ButtonNewObject';
import { Row, Col } from 'react-bootstrap';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTION
import { setVistoriaImovel, setImovelSelect, handleQuarteirao } from '../../../../../store/actions/supportInfo';

// ENUMERATE
import { tipoImovel as tipoImovelEnum } from '../../../../../config/enumerate';

// STYLES
import { selectDefault } from '../../../../../styles/global';
import { Container, UlImovel, LiImovel, ContainerIcon, DivDescription, LiEmpty, Span } from './styles';

function ProcurarImovel({ imovelSelect, findImovel, quarteirao, ...props }) {
  const [ optionQuarteirao, setOptionQuarteirao ] = useState(quarteirao.map( (quarteirao, index) => {
    return { value: index, label: quarteirao.idQuarteirao };
  }));
  const [ numero, setNumero ] = useState("");
  const [ sequencia, setSequencia ] = useState("");
  const [ optionTipoImovel, setOptionTipoImovel ] = useState(Object.entries( tipoImovelEnum ).map(([key, value]) => {
    return { value: value.id, label: value.label };
  }));
  const [ tipoImovel, setTipoImovel ] = useState({ value: "", label: "" });

  function handleList(index) {
    const quarteirao = quarteirao[ findImovel.indexQuarteirao ];
    const imovel = quarteirao.imovel[ index ];

    props.setVistoriaImovel( index, imovel );
  };

  function handleQuarteirao( event ) {
    const indexQuarteirao = event.value;
    const idQuarteirao = optionQuarteirao[ indexQuarteirao ].label;

    props.handleQuarteirao( idQuarteirao, indexQuarteirao );
  }

  function handleInputImovel(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let imovel = props.imovelSelect;
    imovel[name] = value;

    props.setImovelSelect( imovel );
  }

  function handleTipoImovel( event ) {
    const tipoImovel = event.value;

    let imovel = props.imovelSelect;
    imovel.tipoImovel = tipoImovel;

    props.setImovelSelect(imovel);
  }

  return (
    <Container>
      <Row>
        <Col md="6">
          <Row>
            <Col md="12">
              <h4 className="title">Filtrar</h4>
              <div className="form-group">
                <label>Nº do quarteirão?</label>
                <Select
                  styles={ selectDefault }
                  options={ optionQuarteirao }
                  onChange={ handleQuarteirao } />
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Nº do imóvel?</label>
                <input
                  name="numero"
                  type="number"
                  min="0"
                  className="form-control"
                  value={ numero }
                  onChange={ e => setNumero( e.target.value ) } />
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Sequência</label>
                <input
                  name="sequencia"
                  type="number"
                  min="0"
                  className="form-control"
                  value={ sequencia }
                  onChange={ e => setSequencia( e.target.value ) } />
              </div>
            </Col>

            <Col md="12">
              <h4 className="title">Imóvel selecionado</h4>
              {
                imovelSelect.idImovel === -1 ?
                  <p className="description">Nenhum imóvel selecionado</p> :
                  <p className="description">Registro do imóvel: <mark className="bg-success text-white">{imovelSelect.idImovel}</mark></p>
              }
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Nº do imóvel<code>*</code></label>
                <input
                  name="numero"
                  className="form-control"
                  type="number"
                  min="0"
                  disabled={ findImovel.selectImovel ? "" : "disabled" }
                  value={ imovelSelect.numero === -1 ? "" : imovelSelect.numero }
                  onChange={ handleInputImovel } />
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Sequência</label>
                <input
                  name="sequencia"
                  type="number"
                  min="0"
                  className="form-control"
                  disabled={ findImovel.selectImovel ? "" : "disabled" }
                  value={ imovelSelect.sequencia === -1 ? "" : imovelSelect.sequencia }
                  onChange={ handleInputImovel } />
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Responsável<code>*</code></label>
                <input
                  name="responsavel"
                  type="text"
                  className="form-control"
                  disabled={ findImovel.selectImovel ? "" : "disabled" }
                  value={ imovelSelect.responsavel }
                  onChange={ handleInputImovel } />
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Tipo do imóvel<code>*</code></label>
                <Select
                  name="tipoImovel"
                  styles={ selectDefault }
                  isDisabled={ !findImovel.selectImovel }
                  value={{ value: imovelSelect.tipoImovel, label: imovelSelect.tipoImovel }}
                  options={ optionTipoImovel }
                  onChange={ handleTipoImovel } />
              </div>
            </Col>

            <Col md="12">
              <div className="form-group">
                <label>Complemento</label>
                <input
                  name="complemento"
                  type="text"
                  className="form-control"
                  disabled={ findImovel.selectImovel ? "" : "disabled" }
                  value={ imovelSelect.complemento }
                  onChange={ handleInputImovel } />
              </div>
            </Col>
          </Row>
        </Col>

        <Col md="6">
          <h4>Imóveis</h4>

          <ListImovel
            imovelSelect={ imovelSelect.idImovel }
            imovel={
              findImovel.indexQuarteirao === -1 ?
                [] :
                quarteirao[findImovel.indexQuarteirao].imovel
            }
            handleList={ handleList }
            numero={ numero === "" ? "-1" : numero }
            sequencia={ sequencia === "" ? "-1" : sequencia } />
        </Col>
      </Row>
    </Container>
  );
}

function ListImovel( props ) {
  const imovel = props.imovel;
  const handleList = props.handleList;
  const imovelSelect = props.imovelSelect;
  const numero = parseInt(props.numero);
  const sequencia = parseInt(props.sequencia);

  const filterImovel = imovel.filter(
    imovel => {
      return (
        numero === -1 ||
        (
          imovel.numero === numero &&
          ( sequencia === -1 || imovel.sequencia === sequencia )
        )
      );
    }
  );

  let li = filterImovel.map(( imovel, index ) =>
    <LiImovel
      key={ imovel.idImovel }
      className={ imovelSelect === imovel.idImovel ? "active" : "" }
      onClick={ () => handleList( index ) }>
    <ContainerIcon className="ContainerIcon" >
      <IoIosHome />
    </ContainerIcon>
    <DivDescription>
      <div>
        <span className="mr-2">Nº: { imovel.numero }</span>
        <span>Seq.: { imovel.sequencia === -1 ? "" : imovel.sequencia }</span>
      </div>
      <Span>Responsável: { imovel.responsavel }</Span>
    </DivDescription>
  </LiImovel>
  );

  if(filterImovel.length === 0) {
    li = <LiEmpty>
      <h4>Nenhum imóvel encontrado</h4>
    </LiEmpty>;
  }

  return (
    <UlImovel>
      { li }
    </UlImovel>
  )
}

const mapStateToProps = state => ({
  findImovel: {
    idQuarteirao: state.supportInfo.form_vistoria.findImovel.idQuarteirao,
    indexQuarteirao: state.supportInfo.form_vistoria.findImovel.indexQuarteirao,
    selectImovel: state.supportInfo.form_vistoria.findImovel.selectImovel,
  },
  imovelSelect: {
    index: state.supportInfo.form_vistoria.imovel.index,
    idImovel: state.supportInfo.form_vistoria.imovel.idImovel,
    numero: state.supportInfo.form_vistoria.imovel.numero,
    sequencia: state.supportInfo.form_vistoria.imovel.sequencia,
    tipoImovel: state.supportInfo.form_vistoria.imovel.tipoImovel,
    complemento: state.supportInfo.form_vistoria.imovel.complemento,
    responsavel: state.supportInfo.form_vistoria.imovel.responsavel,
  },
  quarteirao: state.supportInfo.quarteirao
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setVistoriaImovel, setImovelSelect, handleQuarteirao }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcurarImovel);
