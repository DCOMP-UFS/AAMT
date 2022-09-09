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
import { atualizarRecipiente } from '../../../../store/Vistoria/vistoriaActions';

// STYLES
import {
  ContainerUnidade,
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

const InspecionarRecipiente = ( {
  updatedIndex,
  recipientes,
  vistorias,
  trabalhoDiario_id,
  data,
  objetivo,
  trabalhoDiario_sequencia,
  codigoMunicipio,
  sequenciaUsuario,
  isPaginaEdicao,
  ...props
} ) => {
  const [ tipoRecipiente, setTipoRecipiente ]       = useState( { value: null, label: null } );
  const [ fl_eliminado, setFl_eliminado ]           = useState( { value: null, label: null } );
  const [ fl_tratado, setFl_tratado ]               = useState( { value: null, label: null } );
  const [ fl_foco, setFl_foco ]                     = useState( { value: null, label: null } );
  const [ dataFormatada, setDataFormatada ]         = useState( null );
  const [ seqAmostra, setSeqAmostra ]               = useState( "" );
  const [ tecnicaTratamento, setTecnicaTratamento ] = useState( { value: tecnicaTratamentoEnum.focal.id, label: tecnicaTratamentoEnum.focal.label } );
  const [ numUnidade, setNumUnidade ]               = useState( 0 );
  const [ qtdTratamento, setQtdTratamento ]         = useState( 0 );
  const [ unidade, setUnidade ]                     = useState( [] );
  const [ reload, setReload ]                       = useState( false );
  const [ optionsTipoRecipiente ]                   = useState( tipoRecipienteEnum.map( tipo => ( { value: tipo, label: tipo } ) ) );
  const [ optionsSimNao ]                           = useState( [
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ] );
  const [ optionsTecnicaTratamento ]                = useState(
    Object.entries( tecnicaTratamentoEnum ).map( ( [ key, value ] ) => ( { value: value.id, label: value.label } ) )
  );
  const [ qtdTratamentoValid , setqtdTratamentoValid] = useState(true)
  
  useEffect( () => {
    if( updatedIndex > -1 ) {
      const recipiente = recipientes[ updatedIndex ];
      setTipoRecipiente({ value: recipiente.tipoRecipiente, label: recipiente.tipoRecipiente });
      setFl_eliminado({ value: recipiente.fl_eliminado, label: recipiente.fl_eliminado ? "Sim" : "Não" });
      setFl_tratado({ value: recipiente.fl_tratado, label: recipiente.fl_tratado ? "Sim" : "Não" });
      setFl_foco({ value: recipiente.fl_comFoco, label: recipiente.fl_comFoco ? "Sim" : "Não" });
      setQtdTratamento( recipiente.tratamento.quantidade );
      setTecnicaTratamento( recipiente.tratamento.tecnica === 1 ?
        { value: tecnicaTratamentoEnum.focal.id, label: tecnicaTratamentoEnum.focal.label } :
        { value: tecnicaTratamentoEnum.perifocal.id, label: tecnicaTratamentoEnum.perifocal.label }
      );
      setUnidade( recipiente.amostras );

      if( recipiente.amostras.length > 0 )
        setNumUnidade( recipiente.amostras[ recipiente.amostras.length - 1 ].sequencia );
    }
  }, [ updatedIndex, recipientes ] );

  useEffect( () => {
    const [ ano, mes, dia ] = data.split( "-" );

    setDataFormatada(`${ dia }${ mes }${ ano }`);
  }, [ data ] );

  /**
   * Adiciona uma nova amostra ao array de amostras do recipiente
   * @returns void
   */
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

  /**
   * Atualiza o recipiente no reduce
   * @returns void
   */
  function submit() {
    // Validação
    let fl_valido = true;// true -> válido | false -> inválido

    if( !validInputIsNull( "#tipoRecipiente", tipoRecipiente.value ) ) fl_valido = false;
    if( !validInputIsNull( "#fl_eliminado", fl_eliminado.value ) ) fl_valido = false;
    if( !validInputIsNull( "#fl_tratado", fl_tratado.value ) ) fl_valido = false;
    if( !validInputIsNull( "#fl_foco", fl_foco.value ) ) fl_valido = false;

    if( fl_tratado.value && qtdTratamento === 0 ) {
      fl_valido = false;

      let input_qtd_tratamento  = $( '#edi_qtdTratamento' );
      let form_group            = input_qtd_tratamento.parent();

      input_qtd_tratamento.addClass( 'invalid' );
      form_group.append( msgInputInvalid( 'O valor não pode ser zero' ) );
      
    }
    else{
      $( '#edi_qtdTratamento' ).removeClass('invalid')
      $( '#edi_qtdTratamento' ).parent().find('span.form-label-invalid').remove();
    }

    /**
     * Verifica a ocorrencia de códigos de amostra
     * que são iguais em um mesmo depósito, em recipientes
     * de uma mesma vistoria e entre diferentes vistorias.
     */
    const arrayCodigosAmostra  = unidade.map( item => item.idUnidade );
    const temCodigoDuplicado   = arrayCodigosAmostra.filter( ( item, index ) => arrayCodigosAmostra.indexOf( item ) !== index );

    let input_seq_amostra        = $( '#edi_row-sequence' );
    let form_group_amostra       = input_seq_amostra.parent();
    let valida_entre_recipiente  = true;

    if( temCodigoDuplicado.length > 0 ) {
      fl_valido = false;
      $( '#edi_row-sequence' ).parent().find('span.form-label-invalid').remove();
      input_seq_amostra.addClass( 'invalid' );

      form_group_amostra.append( msgInputInvalid( `Os códigos ${ temCodigoDuplicado.join( ', ' ) } estão duplicados.` ) );
  
    }

    if( temCodigoDuplicado.length === 0 ) {
      $( '#edi_row-sequence' ).parent().find('span.form-label-invalid').remove();
      recipientes.forEach( ( recipiente, i ) => {
        if( updatedIndex !== i ) {
          recipiente.amostras.forEach( amostra => {
            const index = arrayCodigosAmostra.findIndex( p => p === amostra.idUnidade );
  
            if( index !== -1 ) {
              fl_valido = false;
              valida_entre_recipiente = false;
              input_seq_amostra.addClass( 'invalid' );
  
              form_group_amostra.append( msgInputInvalid( `O código ${ arrayCodigosAmostra[ index ] } já foi gerado nesta vistoria para o recipiente ${ recipiente.sequencia }.` ) );
            }
          } );
        }
      } );
    }
    
    if( temCodigoDuplicado.length === 0 && valida_entre_recipiente ) {
      $( '#edi_row-sequence' ).parent().find('span.form-label-invalid').remove();

      //Caso estivermos na pagina de edição de vistoria (/vistoria/editar/:vistoriaIndex)
      if(isPaginaEdicao){
        vistorias.forEach( ( vistoria, vistoriaIndex ) => {
          //Condicional abaixo ignora a vistoria com index == props.vistoriaIndexEdit,
          //que é justamente a vistoria cujo a pagina de edição nos encontramos.
          //Essa condicional é necessaria para evitar que uma amostra se compare consigo mesma
          if( props.vistoriaIndexEdit != vistoriaIndex ) {
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
          }
        } );
      //Caso estivermos na pagina de cadastro de vistoria (/vistoria/cadastrar)
      } else {
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
          } )
      }
    }

    if( fl_valido ) {
      const recipiente = {
        fl_comFoco    : fl_foco.value,
        fl_tratado    : fl_tratado.value,
        fl_eliminado  : fl_eliminado.value,
        tipoRecipiente: tipoRecipiente.value,
        sequencia     : recipientes[ updatedIndex ].sequencia,
        amostras      : unidade,
        tratamento    : {
          quantidade  : qtdTratamento,
          tecnica     : tecnicaTratamento.value
        },
      };

      setSeqAmostra( "" );

      props.atualizarRecipiente( updatedIndex, recipiente );
      props.showNotifyToast( "Recipiente atualizado com sucesso", "success" );

      $( '#modalEditarInspecao' ).modal( 'hide' );
    } else {
      props.showNotifyToast( "Existem campos obrigatórios não preenchidos", "warning" );
    }
  }

  return (
    <div id="modalEditarInspecao" className="modal fade show" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Inspeção cód.:
              {
                updatedIndex > -1 ?
                  (`${ trabalhoDiario_id }.${ ( vistorias.length + 1) }.${ recipientes[ updatedIndex ].sequencia }`):
                  ''
              }
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">

            <div className="form-group">
              <label htmlFor="tipoRecipiente">Tipo do depósito <code>*</code></label>

              <Select
                id="tipoRecipiente"
                options={ optionsTipoRecipiente }
                value={ tipoRecipiente }
                styles={ selectDefault }
                onChange={ option => setTipoRecipiente( option ) } />
            </div>

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
                  <label htmlFor="edi_qtdTratamento">Quantidade aplicada? (g) <code>*</code></label>

                  <input
                    id="edi_qtdTratamento"
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

            <div className="form-group">
              <label htmlFor="fl_foco">Com foco? <code>*</code></label>

              <Select
                id="fl_foco"
                options={ optionsSimNao }
                value={ fl_foco }
                styles={ selectDefault }
                onChange={ option => setFl_foco( option ) } />
            </div>

            <ContainerUnidade className={ ( fl_foco.value && ( objetivo === 'LI+T' || objetivo === 'T' ) ) ? "active" : "" } >
              <Separator />

              <h4>
                Gerar código da(s) amostra(s)
              </h4>
              <br />

              <Row>
                <Col md="12" className="form-group">
                  <label>Nº da sequencia da amostra</label>
                  <Row id="edi_row-sequence">
                    <Col md="6" className="form-group">
                      <input
                        id="sequencia-amostra"
                        type="number"
                        min="0"
                        className="form-control"
                        value={ seqAmostra }
                        onChange={ e => setSeqAmostra( e.target.value ) }
                        style={{ marginBottom: -24 }} />
                    </Col>
                    <ButtonNewObject
                      title="Gerar código"
                      onClick={ addUnidade } />
                  </Row>
                </Col>
              </Row>

              <ListUnidade unidade={ unidade } remove={ removeUnidade } />
            </ContainerUnidade>
          </div>
          <div className="modal-footer">
            <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
            <Button type="button" onClick={ submit } >Salvar</Button>
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
  trabalhoDiario_id       : state.rotaCache.trabalhoDiario.id,
  data                    : state.rotaCache.trabalhoDiario.data,
  trabalhoDiario_sequencia: state.rotaCache.trabalhoDiario.sequencia,
  codigoMunicipio         : state.rotaCache.trabalhoDiario.codigo_municipio,
  sequenciaUsuario        : state.rotaCache.trabalhoDiario.sequencia_usuario,
  vistorias               : state.vistoriaCache.vistorias,
  recipientes             : state.vistoria.recipientes,
  sequenciaRecipiente     : state.vistoria.sequenciaRecipiente,
  updatedIndex            : state.vistoria.updatedIndex,
  updatedRecipiente       : state.vistoria.updatedRecipiente,
  vistoriaIndexEdit: state.vistoriaCache.vistoriaIndexEdit
});

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    addUnidade,
    atualizarRecipiente,
    showNotifyToast,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( InspecionarRecipiente );
