import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaVial } from 'react-icons/fa';
import { validInputIsNull, msgInputInvalid } from '../../../../config/function';
import $ from 'jquery';
import ButtonNewObject from '../../../../components/ButtonNewObject';
import ButtonClose from '../../../../components/ButtonClose';
import { Row, Col } from 'react-bootstrap';
import {
  tipoRecipiente as tipoRecipienteEnum,
  situacaoAmostraEnum,
  tecnicaTratamentoEnum
} from '../../../../config/enumerate';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { showNotifyToast } from '../../../../store/AppConfig/appConfigActions';
import { addUnidade } from '../../../../store/SupportInfo/supportInfoActions';
import { addRecipiente } from '../../../../store/Vistoria/vistoriaActions';

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
} from '../../../../styles/global';

export const INITIAL_STATE = {
  tipoRecipiente: { value: null, label: null },
  fl_eliminado: { value: null, label: null },
  fl_tratado: { value: null, label: null },
  fl_foco: { value: null, label: null },
  dataFormatada: null,
  seqAmostra: "",
  tecnicaTratamento: { value: tecnicaTratamentoEnum.focal.id, label: tecnicaTratamentoEnum.focal.label },
  numUnidade: 0,
  qtdTratamento: 0,
  unidade: [],
  reload: false,
  optionsTipoRecipiente: tipoRecipienteEnum.map( tipo => (
    { value: tipo, label: tipo }
  ) ),
  optionsSimNao: [
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ],
  optionsTecnicaTratamento: Object.entries( tecnicaTratamentoEnum ).map( ( [ key, value ] ) => ( { value: value.id, label: value.label } ) )
}

function ModalCadastrarInspecao( {
  sequenciaRecipiente,
  recipientes,
  vistorias,
  trabalhoDiario_id,
  data,
  objetivo,
  trabalhoDiario_sequencia,
  codigoMunicipio,
  sequenciaUsuario,
  STATE = INITIAL_STATE,
  ...props 
} ) {
  const [ tipoRecipiente, setTipoRecipiente ]       = useState( STATE.tipoRecipiente );
  const [ fl_eliminado, setFl_eliminado ]           = useState( STATE.fl_eliminado );
  const [ fl_tratado, setFl_tratado ]               = useState( STATE.fl_tratado );
  const [ fl_foco, setFl_foco ]                     = useState( STATE.fl_foco );
  const [ dataFormatada, setDataFormatada ]         = useState( STATE.dataFormatada );
  const [ seqAmostra, setSeqAmostra ]               = useState( STATE.seqAmostra );
  const [ tecnicaTratamento, setTecnicaTratamento ] = useState( STATE.tecnicaTratamento );
  const [ numUnidade, setNumUnidade ]               = useState( STATE.numUnidade );
  const [ qtdTratamento, setQtdTratamento ]         = useState( STATE.qtdTratamento );
  const [ unidade, setUnidade ]                     = useState( STATE.unidade );
  const [ reload, setReload ]                       = useState( STATE.reload );
  const [ optionsTipoRecipiente ]                   = useState( STATE.optionsTipoRecipiente );
  const [ optionsSimNao ]                           = useState( STATE.optionsSimNao );
  const [ optionsTecnicaTratamento ]                = useState( STATE.optionsTecnicaTratamento );

  useEffect( () => {
    const [ ano, mes, dia ] = data.split( "-" );

    setDataFormatada( `${ dia }${ mes }${ ano }` );
  }, [ data ] );

  useEffect( () => {
    $( '#modalCadastrarInspecao' ).on( 'shown.bs.modal', function() {
      $('#tipoRecipiente').focus();
    } );
  }, [] );

  const addUnidade = () => {
    if( seqAmostra === "" ) {
      props.showNotifyToast( "Informe a sequência da amostra", "warning" );
      return;
    }

    let seq         = parseInt( seqAmostra );
    let nu          = numUnidade + 1;
    let listUnidade = unidade;
    let unidade_id  = 
      `${ codigoMunicipio }.${ sequenciaUsuario }.${ dataFormatada }.${ trabalhoDiario_sequencia }.${ seq }`;

    const amostra   = {
      idUnidade: unidade_id,
      sequencia: seq,
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
    else{
      $( '#qtdTratamento' ).removeClass('invalid')
      $( '#qtdTratamento' ).parent().find('span.form-label-invalid').remove();
    }

    /**
     * Verifica a ocorrencia de códigos de amostra
     * que são iguais em um mesmo depósito, em recipientes
     * de uma mesma vistoria e entre diferentes vistorias.
     */
    const arrayCodigosAmostra = unidade.map( item => item.idUnidade );
    const temCodigoDuplicado  = arrayCodigosAmostra.filter( ( item, index ) => arrayCodigosAmostra.indexOf( item ) !== index );

    var input_seq_amostra = $( '#row-sequence' ),
    form_group_amostra    = input_seq_amostra.parent();

    let valida_entre_recipiente = true;

    if( temCodigoDuplicado.length > 0 ) {
      fl_valido = false;
      $( '#row-sequence' ).parent().find('span.form-label-invalid').remove();
      input_seq_amostra.addClass( 'invalid' );

      form_group_amostra.append( msgInputInvalid( `Os códigos <strong>${ temCodigoDuplicado.join( ', ' ) }</strong> estão duplicados.` ) );
      
    }

    if( temCodigoDuplicado.length === 0 ) {
      $( '#row-sequence' ).parent().find('span.form-label-invalid').remove();
      recipientes.forEach( recipiente => {
        recipiente.amostras.forEach( amostra => {
          const index = arrayCodigosAmostra.findIndex( p => p === amostra.idUnidade );

          if( index !== -1 ) {
            fl_valido = false;
            valida_entre_recipiente = false;
            input_seq_amostra.addClass( 'invalid' );

            form_group_amostra.append( msgInputInvalid( `O código <strong>${ arrayCodigosAmostra[ index ] }</strong> já foi gerado nesta vistoria para o recipiente ${ recipiente.sequencia }.` ) );
          }
        } )
      } )
    }

    if( temCodigoDuplicado.length === 0 && valida_entre_recipiente ) {
      $( '#row-sequence' ).parent().find( 'span.form-label-invalid' ).remove();
      vistorias.forEach( ( vistoria, vistoriaIndex ) => {
        vistoria.recipientes.forEach( recipiente => {
          recipiente.amostras.forEach( amostra => {
            const index = arrayCodigosAmostra.findIndex( p => p === amostra.idUnidade );

            if( index !== -1 ) {
              fl_valido = false;
              input_seq_amostra.addClass( 'invalid' );

              form_group_amostra.append( msgInputInvalid( `O código ${ arrayCodigosAmostra[ index ] } já foi gerado para o recipiente ${ recipiente.sequencia } <a href="/vistoria/editar/${ vistoriaIndex }">em outro imóvel</a>.` ) );
            }
          } );
        } );
      } );
    }

    if( fl_valido ) {
      const recipiente = {
        fl_comFoco:     fl_foco.value,
        fl_tratado:     fl_tratado.value,
        fl_eliminado:   fl_eliminado.value,
        tipoRecipiente: tipoRecipiente.value,
        sequencia:      sequenciaRecipiente,
        tratamento:     {
          quantidade: qtdTratamento,
          tecnica:    tecnicaTratamento.value
        },
        amostras:       unidade
      };

      props.addRecipiente( recipiente );

      // Reset state
      setTipoRecipiente( { value: null, label: null, name: "tipoRecipiente" } );
      setFl_eliminado( { value: null, label: null, name: "fl_eliminado" } );
      setFl_tratado( { value: null, label: null, name: "fl_tratado" } );
      setFl_foco( { value: null, label: null, name: "fl_foco" } );
      // setNumUnidade( 0 );
      setUnidade( [] );
      setSeqAmostra( "" );
      setQtdTratamento( 0 );
      setTecnicaTratamento( { value: tecnicaTratamentoEnum.focal.id, label: tecnicaTratamentoEnum.focal.label } );

      $( '#modalCadastrarInspecao' ).modal( 'hide' );
    } else {
      props.showNotifyToast( "Existem campos obrigatórios não preenchidos", "warning" );
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
                  data-testid="fl_eliminado"
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
                data-testid="fl_foco"
                options={ optionsSimNao }
                value={ fl_foco }
                styles={ selectDefault }
                onChange={ option => setFl_foco( option ) }
              />
            </div>
            {
              ( fl_foco.value && ( objetivo === 'LI+T' || objetivo === 'LI' ) ) ?
                (
                  <ContainerUnidade className={ ( fl_foco.value && ( objetivo === 'LI+T' || objetivo === 'LI' ) ) ? "active" : "" } >
                    <Separator />

                    <h4>
                      Gerar código da(s) amostra(s)
                    </h4>
                    <br />

                    <Row>
                      <Col md="12" className="form-group">
                        <label>Nº da sequencia da amostra</label>
                        <Row id="row-sequence">
                          <Col className="form-group">
                            <input
                              id          ="sequencia-amostra"
                              data-testid ="sequencia-amostra"
                              type        ="number"
                              min         ="0"
                              className   ="form-control"
                              value       ={ seqAmostra }
                              onChange    ={ e => setSeqAmostra( parseInt( e.target.value ) ) }
                              style       ={ { marginBottom: -24 } } 
                            />
                          </Col>
                          <Col>
                            <ButtonNewObject id="btn-add-amostra" data-testid="btn-add-amostra" title="Adicionar Amostra" onClick={ addUnidade } />
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <ListUnidade unidade={ unidade } remove={ removeUnidade } />
                  </ContainerUnidade>
                ) :
                <div />
            }
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
    <LiIcon key={ index } className="item">
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
    li = <LiEmpty className="empty">
      <h4>Nenhuma amostra cadastrada</h4>
    </LiEmpty>;
  }

  return (
    <UlIcon id="lista-amostras">
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
  bindActionCreators( {
    addUnidade,
    addRecipiente,
    showNotifyToast,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalCadastrarInspecao );
