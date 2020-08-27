import React, { useState } from 'react';
import Select from 'react-select';
import { FaVial } from 'react-icons/fa';
import { validInputIsNull } from '../../../../../config/function';
import $ from 'jquery';
import ButtonNewObject from '../../../../../components/ButtonNewObject';
import ButtonClose from '../../../../../components/ButtonClose';
import {
  tipoRecipiente as tipoRecipienteEnum,
  tipoColetor as tipoColetorEnum,
  situacaoUnidade as situacaoUnidadeEnum
} from '../../../../../config/enumerate';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { addInspecao, addUnidade } from '../../../../../store/actions/supportInfo';

// STYLES
import { ContainerUnidade } from './styles';
import {
  Button,
  selectDefault,
  Separator,
  UlIcon,
  LiIcon,
  LiEmpty,
  ContainerIcon,
  DivDescription
} from '../../../../../styles/global';

function InspecionarRecipiente({ objetivo, ...props }) {
  const [ tipoColetor, setTipoColetor ] = useState({ value: null, label: null, name: "tipoColetor" });
  const [ tipoRecipiente, setTipoRecipiente ] = useState({ value: null, label: null, name: "tipoRecipiente" });
  const [ fl_eliminado, setFl_eliminado ] = useState({ value: null, label: null, name: "fl_eliminado" });
  const [ fl_tratado, setFl_tratado ] = useState({ value: null, label: null, name: "fl_tratado" });
  const [ fl_foco, setFl_foco ] = useState({ value: null, label: null, name: "fl_foco" });
  const [ numUnidade, setNumUnidade ] = useState(0);
  const [ unidade, setUnidade ] = useState([]);
  const [ optionsTipoRecipiente, setOptionsTipoRecipiente ] = useState(tipoRecipienteEnum.map( tipo => (
    { value: tipo, label: tipo, name: "tipoRecipiente" }
  ) ));
  const [ optionsSimNao, setOptionsSimNao ] = useState([
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ]);
  const [ optionsTipoColetor, setOptionsTipoColetor ] = useState(tipoColetorEnum.map( tipo => (
    { value: tipo, label: tipo, name: "tipoColetor" }
  )));

  function addUnidade() {
    let fl_valido = true;// true -> válido | false -> inválido
    const tipoColetor = tipoColetor.value;

    if( !validInputIsNull( "#tipoColetor", tipoColetor ) ) fl_valido = false;

    if( fl_valido ) {
      let numUnidade = numUnidade + 1;
      let listUnidade = unidade;

      const unidade = {
        idUnidade: props.idRecipiente + "." + numUnidade,
        tipoColetor,
        situacao: situacaoUnidadeEnum[0]
      }

      listUnidade.push( unidade );

      setNumUnidade( numUnidade );
      setUnidade( listUnidade );
    }
  }

  function removeUnidade( index ) {
    let unidade = unidade;

    unidade.splice( index, 1 );

    setUnidade( unidade );
  }

  function submit() {
    // Validação
    let fl_valido = true;// true -> válido | false -> inválido
    if( !validInputIsNull( "#tipoRecipiente", tipoRecipiente.value ) ) fl_valido = false;
    if( !validInputIsNull( "#fl_eliminado", fl_eliminado.value ) ) fl_valido = false;
    if( !validInputIsNull( "#fl_tratado", fl_tratado.value ) ) fl_valido = false;
    if( !validInputIsNull( "#fl_foco", fl_foco.value ) ) fl_valido = false;

    if( fl_valido ) {
      props.addInspecao( props.idRecipiente, tipoRecipiente.value, fl_eliminado.value, fl_tratado.value, fl_foco.value );

      unidade.forEach( u => {
        props.addUnidade( u.idUnidade, u.tipoColetor, u.situacao );
      });

      // Reset state
      setTipoColetor({ value: null, label: null, name: "tipoColetor" });
      setTipoRecipiente({ value: null, label: null, name: "tipoRecipiente" });
      setFl_eliminado({ value: null, label: null, name: "fl_eliminado" });
      setFl_tratado({ value: null, label: null, name: "fl_tratado" });
      setFl_foco({ value: null, label: null, name: "fl_foco" });
      setNumUnidade( 0 );
      setUnidade( [] );

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
              <label htmlFor="tipoRecipiente">Tipo de recipiente <code>*</code></label>

              <Select
                id="tipoRecipiente"
                options={ optionsTipoRecipiente }
                value={ tipoRecipiente }
                styles={ selectDefault }
                onChange={ option => setTipoRecipiente( option ) } />
            </div>

            <div className="form-group">
              <label htmlFor="fl_eliminado">Recipiente eliminado? <code>*</code></label>

              <Select
                id="fl_eliminado"
                options={ optionsSimNao.map( option => ({ ...option, name: "fl_eliminado" }) ) }
                value={ fl_eliminado }
                styles={ selectDefault }
                onChange={ option => setFl_eliminado( option ) } />
            </div>

            <div className="form-group">
              <label htmlFor="fl_tratado">Recipiente tratado? <code>*</code></label>

              <Select
                id="fl_tratado"
                options={ optionsSimNao.map( option => ({ ...option, name: "fl_tratado" }) ) }
                value={ fl_tratado }
                styles={ selectDefault }
                onChange={ option => setFl_tratado( option ) } />
            </div>

            <div className="form-group">
              <label htmlFor="fl_foco">Com foco? <code>*</code></label>

              <Select
                id="fl_foco"
                options={ optionsSimNao.map( option => ({ ...option, name: "fl_foco" }) ) }
                value={ fl_foco }
                styles={ selectDefault }
                onChange={ option => setFl_foco( option ) } />
            </div>

            <ContainerUnidade className={ ( fl_foco.value && ( objetivo === 'LI+T' || objetivo === 'T' ) ) ? "active" : "" } >
              <Separator />

              <h4>
                Cadastrar Amostra(s)
                <ButtonNewObject
                  title="Cadastrar Amostra"
                  onClick={ addUnidade } />
              </h4>

              <div className="form-group">
                <label htmlFor="tipoColetor">Coletor <code>*</code></label>
                <Select
                  id="tipoColetor"
                  options={ optionsTipoColetor }
                  value={ tipoColetor }
                  styles={ selectDefault }
                  onChange={ option => setTipoColetor( option ) } />
              </div>

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
    <LiIcon
      key={ index } >
    <ContainerIcon className="ContainerIcon" >
      <FaVial />
    </ContainerIcon>
    <DivDescription>
      <div>
        <span className="mr-2">Cód.: { unidade.idUnidade }</span>
        <span>Coletor: { unidade.tipoColetor }</span>
      </div>

      <ButtonClose
        title="Remover amostra"
        onClick={ () => remove( index ) } />
    </DivDescription>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addInspecao, addUnidade }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InspecionarRecipiente);
