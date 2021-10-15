import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaVial } from 'react-icons/fa';
import { validInputIsNull, msgInputInvalid } from '../../../../../config/function';
import $ from 'jquery';
import ButtonNewObject from '../../../../../components/ButtonNewObject';
import ButtonClose from '../../../../../components/ButtonClose';
import { Row, Col } from 'react-bootstrap';
import {
  tipoRecipiente as tipoRecipienteEnum,
  situacaoAmostraEnum,
  tecnicaTratamentoEnum
} from '../../../../../config/enumerate';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { addUnidade } from '../../../../../store/actions/supportInfo';
import { addRecipiente } from '../../../../../store/actions/VistoriaActions';

// STYLES
import {
  ContainerUnidade,
  Tratamento,
  ContainerTratamento,
  UlIcon,
  LiIcon,
  ContainerIcon,
  DivDescription,
  ListContainer
} from './styles';
import {
  Button,
  selectDefault,
  Separator,
  LiEmpty
} from '../../../../../styles/global';

function InspecionarRecipiente({ sequenciaRecipiente, recipientes, vistorias, trabalhoDiario_id, data, objetivo, trabalhoDiario_sequencia, codigoMunicipio, sequenciaUsuario, ...props }) {
  const [ tipoRecipiente, setTipoRecipiente ] = useState({ value: null, label: null });
  const [ fl_eliminado, setFl_eliminado ] = useState({ value: null, label: null });
  const [ fl_tratado, setFl_tratado ] = useState({ value: null, label: null });
  const [ fl_foco, setFl_foco ] = useState({ value: null, label: null });
  const [ dataFormatada, setDataFormatada ] = useState( null );
  const [ seqAmostra, setSeqAmostra ] = useState( 0 );
  const [ tecnicaTratamento, setTecnicaTratamento ] = useState({ value: tecnicaTratamentoEnum.focal.id, label: tecnicaTratamentoEnum.focal.label });
  const [ numUnidade, setNumUnidade ] = useState(0);
  const [ qtdTratamento, setQtdTratamento ] = useState( 0 );
  const [ unidade, setUnidade ] = useState([]);
  const [ reload, setReload ] = useState( false );
  const [ optionsTipoRecipiente ] = useState(tipoRecipienteEnum.map( tipo => (
    { value: tipo, label: tipo }
  ) ));
  const [ optionsSimNao ] = useState([
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ]);
  const [ optionsTecnicaTratamento ] = useState(
    Object.entries( tecnicaTratamentoEnum ).map(([ key, value ]) => ({ value: value.id, label: value.label }))
  );

  useEffect(() => {
    const [ano, mes, dia] = data.split("-");

    setDataFormatada(`${dia}${mes}${ano}`);
  }, [data]);

  useEffect(() => {
    $( '#modalCadastrarInspecao' ).on( 'shown.bs.modal', function() {
      $('#tipoRecipiente').focus();
    });
  }, []);

  function addUnidade() {
    let nu = numUnidade + 1;
    let listUnidade = unidade;

    const amostra = {
      idUnidade:
        codigoMunicipio + '.' +
        sequenciaUsuario + '.' +
        dataFormatada + '.' +
        trabalhoDiario_sequencia + '.' +
        seqAmostra,
      sequencia: seqAmostra,
      situacao: situacaoAmostraEnum.coletada.id
    }

    listUnidade.push( amostra );

    setNumUnidade( nu );
    setUnidade( listUnidade );
  }

  function removeUnidade( index ) {
    let u = unidade;
    u.splice( index, 1 );

    setUnidade( u );
    setReload( !reload );
  }

  function submit() {
    // Validação
    let fl_valido = true;// true -> válido | false -> inválido
    if( !validInputIsNull( "#tipoRecipiente", tipoRecipiente.value ) ) fl_valido = false;
    if( objetivo === 'LI+T' || objetivo === 'T' ) {
      if( !validInputIsNull( "#fl_eliminado", fl_eliminado.value ) ) fl_valido = false;
      if( !validInputIsNull( "#fl_tratado", fl_tratado.value ) ) fl_valido = false;
    }
    if( !validInputIsNull( "#fl_foco", fl_foco.value ) ) fl_valido = false;
    if( fl_tratado.value && qtdTratamento === 0 ) {
      fl_valido = false;

      var input_qtd_tratamento = $( '#qtdTratamento' ),
          form_group = input_qtd_tratamento.parent();
      input_qtd_tratamento.addClass( 'invalid' );

      form_group.append( msgInputInvalid( 'O valor não pode ser zero' ) );
    }

    if( fl_valido ) {
      const recipiente = {
        fl_comFoco: fl_foco.value,
        fl_tratado: fl_tratado.value,
        fl_eliminado: fl_eliminado.value,
        tipoRecipiente: tipoRecipiente.value,
        sequencia: sequenciaRecipiente,
        tratamento: {
          quantidade: qtdTratamento,
          tecnica: tecnicaTratamento.value
        },
        amostras: unidade
      };

      props.addRecipiente( recipiente );

      // Reset state
      setTipoRecipiente({ value: null, label: null, name: "tipoRecipiente" });
      setFl_eliminado({ value: null, label: null, name: "fl_eliminado" });
      setFl_tratado({ value: null, label: null, name: "fl_tratado" });
      setFl_foco({ value: null, label: null, name: "fl_foco" });
      // setNumUnidade( 0 );
      setUnidade( [] );
      setQtdTratamento( 0 );
      setTecnicaTratamento({ value: tecnicaTratamentoEnum.focal.id, label: tecnicaTratamentoEnum.focal.label });

      $('#modalCadastrarInspecao').modal('hide');
    }
  }

  return (
    <div id="modalCadastrarInspecao" className="modal fade show" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Cadastrar Inspeção</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label>Tipo do depósito <code>*</code></label>

              <Select
                options={ optionsTipoRecipiente }
                value={ tipoRecipiente }
                styles={ selectDefault }
                onChange={ option => setTipoRecipiente( option ) } />
            </div>

            <Tratamento className={ ( objetivo === 'LI+T' || objetivo === 'T' ) ? "active" : "" }>
              <div className="form-group">
                <label htmlFor="fl_eliminado">Depósito eliminado? <code>*</code></label>
                <Select
                  id="fl_eliminado"
                  options={ optionsSimNao }
                  value={ fl_eliminado }
                  styles={ selectDefault }
                  onChange={ option => {
                    setFl_eliminado( option );
                    if( option.value )
                      setFl_tratado({ value: false, label: "Não" });
                  }} />
              </div>
              <div className="form-group">
                <label htmlFor="fl_tratado">Depósito tratado? <code>*</code></label>
                <Select
                  id="fl_tratado"
                  options={ optionsSimNao }
                  value={ fl_tratado }
                  styles={ selectDefault }
                  onChange={ option => {
                    setFl_tratado( option );
                    if( option.value )
                      setFl_eliminado({ value: false, label: "Não" });
                  } } />
              </div>
              <ContainerTratamento className={ fl_tratado.value === true ? "" : "d-none" }>
                <Row>
                  <Col md="6" className="form-group">
                    <label htmlFor="qtdTratamento">Quantidade aplicada? (g) <code>*</code></label>
                    <input
                      id="qtdTratamento"
                      type="number"
                      step="0.01"
                      min={ 0.01 }
                      className="form-control"
                      value={ qtdTratamento }
                      onChange={ e => setQtdTratamento( e.target.value === "" ? 0 : parseFloat( e.target.value ) ) } />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="tecnicaTratamento">Técnica? <code>*</code></label>
                    <Select
                      id="tecnicaTratamento"
                      options={ optionsTecnicaTratamento }
                      value={ tecnicaTratamento }
                      styles={ selectDefault }
                      onChange={ option => setTecnicaTratamento( option ) } />
                  </Col>
                </Row>
              </ContainerTratamento>
            </Tratamento>

            <div className="form-group">
              <label htmlFor="fl_foco">Com foco? <code>*</code></label>

              <Select
                id="fl_foco"
                options={ optionsSimNao }
                value={ fl_foco }
                styles={ selectDefault }
                onChange={ option => setFl_foco( option ) } />
            </div>

            <ContainerUnidade className={ ( fl_foco.value && ( objetivo === 'LI+T' || objetivo === 'LI' ) ) ? "active" : "" } >
              <Separator />

              <h4>
                Gerar código da(s) amostra(s)
              </h4>
              <br />

              <Row>
                <Col md="6" className="form-group">
                  <label>Nº da sequencia da amostra</label>
                  <input
                    name="sequencia-amostra"
                    type="number"
                    min="0"
                    className="form-control"
                    value={ seqAmostra }
                    onChange={ e => setSeqAmostra( e.target.value ) } />
                </Col>
                <ButtonNewObject
                  title="Gerar código"
                  onClick={ addUnidade } />
              </Row>

              <ListUnidade unidade={ unidade } remove={ removeUnidade } />
            </ContainerUnidade>
          </div>
          <div className="modal-footer">
            <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
            <Button type="button" onClick={ submit } >Cadastrar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListUnidade( props ) {
  const unidade = props.unidade;
  const remove = props.remove;

  let li = unidade.map(( unidade, index ) =>
    <LiIcon key={ index } >
      <ListContainer>
        <ContainerIcon>
          <FaVial />
        </ContainerIcon>
        <DivDescription>
          <div>
            <span className="mr-2">Cód. da amostra: { unidade.idUnidade }</span>
          </div>
        </DivDescription>
      </ListContainer>
      <ButtonClose
        title="Remover amostra"
        className="ml-2 text-danger"
        onClick={ () => remove( index ) }
      />
    </LiIcon>
  );

  if( unidade.length === 0 ) {
    li = <LiEmpty>
      <h4>Nenhuma amostra cadastrada</h4>
    </LiEmpty>;
  }

  return (
    <UlIcon>
      { li }
    </UlIcon>
  )
}

const mapStateToProps = state => ({
  trabalhoDiario_id: state.rotaCache.trabalhoDiario.id,
  data: state.rotaCache.trabalhoDiario.data,
  trabalhoDiario_sequencia: state.rotaCache.trabalhoDiario.sequencia,
  codigoMunicipio: state.rotaCache.trabalhoDiario.codigo_municipio,
  sequenciaUsuario: state.rotaCache.trabalhoDiario.sequencia_usuario,
  vistorias: state.vistoriaCache.vistorias,
  recipientes: state.vistoria.recipientes,
  sequenciaRecipiente: state.vistoria.sequenciaRecipiente,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addUnidade, addRecipiente }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InspecionarRecipiente);
