import React, { useEffect, useState } from 'react';
import { IoIosHome } from 'react-icons/io';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTION
import { setQuarteiraoSelect, setImovelSelected } from '../../../../../store/actions/VistoriaActions';

// ENUMERATE
import { tipoImovel as tipoImovelEnum } from '../../../../../config/enumerate';

// STYLES
import { selectDefault } from '../../../../../styles/global';
import { Container, UlImovel, LiImovel, ContainerIcon, DivDescription, LiEmpty, Span } from './styles';

function ProcurarImovel({ imovel, selectQuarteirao, rota, quarteirao, ...props }) {
  const [ optionQuarteirao, setOptionQuarteirao ] = useState( rota.map(( quarteirao, index ) => {
    return { value: index, label: quarteirao.numero, id: quarteirao.id };
  }));
  const [ numero, setNumero ] = useState("");
  const [ sequencia, setSequencia ] = useState("");
  const [ optionTipoImovel, setOptionTipoImovel ] = useState(Object.entries( tipoImovelEnum ).map(([key, value]) => {
    return { value: value.id, label: value.label };
  }));

  useEffect(() => {
    props.setQuarteiraoSelect({ value: 0, label: rota[0].numero, id: rota[0].id });
  }, []);

  function handleImovel( i ) {
    props.setImovelSelected( i );
  };

  function handleInputImovel(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let i = imovel;
    i[name] = value;

    props.setImovelSelected( i );
  }

  function handleTipoImovel( option ) {
    let i = imovel;
    i.tipoImovel = option.value;

    props.setImovelSelected( i );
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
                  onChange={ option => props.setQuarteiraoSelect( option ) }
                  value={ selectQuarteirao } />
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
                imovel ?
                  <p className="description">Registro do imóvel: <mark className="bg-success text-white">{ imovel.id }</mark></p> :
                  <p className="description">Nenhum imóvel selecionado</p>
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
                  disabled={ imovel ? "" : "disabled" }
                  value={ imovel ?  imovel.numero : "" }
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
                  disabled={ imovel ? "" : "disabled" }
                  value={ imovel ? ( imovel.sequencia !== null ? imovel.sequencia : "" ) : "" }
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
                  disabled={ imovel ? "" : "disabled" }
                  value={ imovel ? imovel.responsavel : "" }
                  onChange={ handleInputImovel } />
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Tipo do imóvel<code>*</code></label>
                <Select
                  name="tipoImovel"
                  styles={ selectDefault }
                  isDisabled={ imovel ? false : true }
                  value={
                    imovel ?
                      optionTipoImovel.find( ti => ti.value === imovel.tipoImovel ) :
                      {}
                  }
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
                  disabled={ imovel ? "" : "disabled" }
                  value={ imovel ? imovel.complemento : "" }
                  onChange={ handleInputImovel } />
              </div>
            </Col>
          </Row>
        </Col>

        <Col md="6">
          <h4>Imóveis</h4>

          <ListImovel
            idImovelSelect={ imovel ? imovel.id : undefined }
            quarteirao={ selectQuarteirao ? rota[ selectQuarteirao.value ] : undefined }
            rotaIndex={ selectQuarteirao ? selectQuarteirao.value : undefined }
            handleImovel={ handleImovel }
            numero={ numero === "" ? "-1" : numero }
            sequencia={ sequencia === "" ? "-1" : sequencia } />
        </Col>
      </Row>
    </Container>
  );
}

function ListImovel({ rotaIndex, idImovelSelect, quarteirao, ...props }) {
  const imoveis = quarteirao ?
    quarteirao.lados.reduce(( imoveis, l ) => {
      l.imoveis = l.imoveis.map( i => ({ ...i, numeroQuarteirao: quarteirao.numero, logradouro: l.rua.nome }));
      return [ ...imoveis, ...l.imoveis ];
    }, []) :
    [];
  const numero = parseInt( props.numero );
  const sequencia = parseInt( props.sequencia );

  const filterImovel = imoveis.filter(
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
      key={ index}
      className={ idImovelSelect === imovel.id ? "active" : "" }
      onClick={ () => props.handleImovel( imovel ) }>
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
  rota: state.rotaCache.rota,
  quarteirao: state.supportInfo.quarteirao,
  selectQuarteirao: state.vistoria.selectQuarteirao,
  imovel: state.vistoria.imovel,
  reload: state.vistoria.reload
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setQuarteiraoSelect,
    setImovelSelected,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcurarImovel);
