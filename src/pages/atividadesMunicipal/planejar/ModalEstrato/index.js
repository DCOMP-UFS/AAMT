import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import { Row, Col } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import $ from 'jquery';
import Modal, { ModalBody, ModalFooter } from '../../../../components/Modal';
import { abrangencia as abrangenciaEnum } from '../../../../config/enumerate';
import Select from 'react-select'

// ACTIONS
import { addEstrato } from '../../../../store/Atividade/atividadeActions';
import { showNotifyToast } from '../../../../store/AppConfig/appConfigActions';


// STYLES
import { UlLocal, LiLocal, ContainerCheck, DivDescription, LiEmpty, Arrows } from './styles';
import { ContainerArrow } from '../../../../styles/util';
import { Button, FormGroup } from '../../../../styles/global';

const ModalEstrato = ( { atividade, estratos, isOpen, handleClose, ...props } ) => {
  const [ abrangencia, setAbrangencia ]               = useState( "" );
  const [ locais, setLocais ]                         = useState( [] );
  const [ locaisSelecionados, setLocaisSelecionados ] = useState( [] );
  const [ reload, setReload ]                         = useState( false );

  const [ metodoFiltragem, setMetodoFiltragem ] = useState({ label: "Sem filtragem", value: null })
  const [ optionsMetodoFiltragem, setOptionsMetodoFiltragem ] = useState([
    { label: "Sem filtragem", value: null },
    { label: "Número", value: 1 },
    { label: "Bairro/localidade", value: 2 },
    { label: "Zona", value: 3 },

  ]);
  const [ opcaoSelecionada, setOpcaoSelecionada ] = useState( '' )
  const [ opcoesDisponiveis, setOpcoesDisponiveis ] =  useState([])
  const [ fl_filtragem, setFl_Filtragem] = useState(false)

  const [ fl_locais_select_all, setFl_Locais_Select_All] = useState(false)
  const [ fl_locais_deselect_all, setFl_Locais_Deselect_All] = useState(false)

  const opcoesLocalidades = props.localidades.map( loc => ({label:loc.nome, value:loc.id}) )
  const opcoesZonas = props.zonas.map( z => ({label:z.nome, value:z.id}) )

  //É acionado sempre que o modal é aberto
  //Limpa os dados deixados quando o modal foi fechado
  useEffect( () => {
    if(isOpen){
      setMetodoFiltragem({ label: "Sem filtragem", value: null })
      clearInput()
    }

    handleClose()
  }, [ isOpen ] );


  useEffect( () => {
    if( Object.entries( atividade ).length > 0 ) {
      let abr = Object.entries( abrangenciaEnum )
        .filter( ( [ attr, data ] ) => data.id === atividade.abrangencia )[ 0 ][ 1 ].label;

      setAbrangencia( abr.split(' ')[ 1 ] );
    }
  }, [ atividade ] );


  useEffect( () => {
    montarListaLocais()
  }, [ props.locais, props.externalReload] );


  //Todas vez que o tipo de filtragem é mudado, este useEffect adequar as opções disponiveis para a filtragem
  //de acordo com o tipo de filtragem escolhida
  useEffect( () => {
    uncheckListaLocais()
    setFl_Filtragem(!fl_filtragem)

    //Numero
    if(metodoFiltragem.value == 1)
      setOpcaoSelecionada('')
    //Bairro/Localidade
    else if(metodoFiltragem.value == 2){
      setOpcaoSelecionada('')
      setOpcoesDisponiveis(opcoesLocalidades)
    }
    //Zona
    else if(metodoFiltragem.value == 3){
      if(opcoesZonas.length == 0)
        setOpcaoSelecionada({label:'Sem zonas disponíveis',value:null})
      else
        setOpcaoSelecionada('')

      setOpcoesDisponiveis(opcoesZonas)
    }
    //Sem filtragem
    else{
      setOpcaoSelecionada('')
      setOpcoesDisponiveis([])
    }
  }, [ metodoFiltragem ] );

  
  useEffect( () => {
    uncheckListaLocais()
    setFl_Filtragem(!fl_filtragem)
  }, [ opcaoSelecionada ] );


  function clearInput() {
    montarListaLocais()
    setLocaisSelecionados( [] );
  }

  function montarListaLocais() {
    let l = props.locais.map( ( loc, index ) => ( { ...loc, dataIndex: index, selecionado:false } ) )
    setLocais(l);
  }

  //Função faz que todos os elementos checked da lista de locais são unchecked
  function uncheckListaLocais(){
    const l = locais
    l.forEach( loc => {
      if(loc.checked)
        loc.checked = false
    })
    setLocais(l)
  }

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
      .map( l => ( { ...l, checked: false } ) );
    
    let new_locais = locais
    lSelecionado.forEach( lSel =>  {
      new_locais[lSel.dataIndex].selecionado = true
      new_locais[lSel.dataIndex].checked = false
    })

    setLocaisSelecionados( [ ...locaisSelecionados, ...lSelecionado ] );
    setLocais( new_locais );
  }

  function removeLocal() {
    let l = locaisSelecionados
      .filter( l => l.checked ? l.checked : false )
      .map( l => ( { ...l, checked: false } ) );
    let lSelecionado = locaisSelecionados.filter( l => l.checked ? !l.checked : true );

    let new_locais = locais
    l.forEach( loc => new_locais[loc.dataIndex].selecionado = false)

    setLocaisSelecionados( lSelecionado );
    setLocais( new_locais );
  }

  function handleSelectAllLocais( locaisExibidos ){
    let l = locais
    locaisExibidos.forEach( loc => l[loc.dataIndex].checked = true )
    setLocais(l)
    setReload( !reload );
  }

  function handleDeselectAllLocais( locaisExibidos ){
    let l = locais
    locaisExibidos.forEach( loc => l[loc.dataIndex].checked = false )
    setLocais(l)
    setReload( !reload );
  }

  function handleSelectAllLocaisSelecionados( locSelecionados ){
    locSelecionados.forEach( locSel => locSel.checked = true)
    setLocaisSelecionados(locSelecionados)
  }

  function handleDeselectAllLocaisSelecionados( locSelecionados ){
    locSelecionados.forEach( locSel => locSel.checked = false)
    setLocaisSelecionados(locSelecionados)
  }

 /*  function dbClickLocal( index ) {
    let l = locais.filter( ( l, i ) => i !== index );

    setLocaisSelecionados( [ ...locaisSelecionados, locais[ index ] ] );
    setLocais( l );
  } */

  /* function dbClickLocalSelecionado( index ) {
    let l = locaisSelecionados.filter( ( l, i ) => i !== index );

    setLocais( [ ...locais, locaisSelecionados[ index ] ] );
    setLocaisSelecionados( l );
  } */

  function handleSubmit( e ) {
    e.preventDefault();

    if( locaisSelecionados.length > 0 ) {
      props.addEstrato( locais, locaisSelecionados );
      setLocaisSelecionados( [] );
      $('#modal-novo-estrato').modal( 'hide' );
    }
  }

  return (
    <Modal id="modal-novo-estrato" title="Planejar área de atuação" size="lg" >
      {
        (() => {
          //Se abrangência for por quarteirão, será disponibilizado
          //opções de filtragem da lista
          if(atividade.abrangencia == 3){
            return (
              <MenuFiltros
                metodoFiltragem = {metodoFiltragem}
                optionsMetodoFiltragem = {optionsMetodoFiltragem}
                setMetodoFiltragem = {setMetodoFiltragem}
                opcaoSelecionada = {opcaoSelecionada}
                opcoesDisponiveis = {opcoesDisponiveis}
                setOpcaoSelecionada = {setOpcaoSelecionada}
              />
            )
          }
        })()
      }

      <form onSubmit={ handleSubmit }>
        <ModalBody>
          <Row>
            <Col sm="5">
              <FormGroup>
                <label>{ abrangencia }</label>
                <ListLocaly
                  locais={ locais }
                  onClick={ handleLocal }
                  isListaSelecionados={ false }
                  abrangencia= {atividade.abrangencia}
                  metodoFiltragem = { metodoFiltragem.value }
                  opcaoSelecionada = { opcaoSelecionada }
                  reloadByFilter = { fl_filtragem } //recarrega a lista toda fez que ocorre uma filtragem
                  handleSelectAll = { handleSelectAllLocais }
                  handleDeselectAll = { handleDeselectAllLocais }
                  //onDoubleClick={ dbClickLocal }
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
                  isListaSelecionados={ true }
                  handleSelectAll = { handleSelectAllLocaisSelecionados }
                  handleDeselectAll = { handleDeselectAllLocaisSelecionados }
                  //onDoubleClick={ dbClickLocalSelecionado }
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

function MenuFiltros( props ) {

  const metodoFiltragem = props.metodoFiltragem
  const optionsMetodoFiltragem = props.optionsMetodoFiltragem
  const setMetodoFiltragem = props.setMetodoFiltragem
  const opcaoSelecionada = props.opcaoSelecionada
  const opcoesDisponiveis = props.opcoesDisponiveis
  const setOpcaoSelecionada = props.setOpcaoSelecionada

  return (
    <Row style={{marginLeft:"4px", marginTop:"10px"}}>
      <Col sm="5">
        <div>

          <label htmlFor="Filtro">Filtragem por:</label>
          <Select
            id="filtro"
            value={ metodoFiltragem }
            options={ optionsMetodoFiltragem }
            onChange={ e => setMetodoFiltragem(e) }
          />

          <div style={{marginTop:"15px"}}>
            <Row className={ metodoFiltragem.value == 1 ? "" : "d-none"}>
              <Col sm="8">
                <label htmlFor="numero">Informe o número</label>
                <input
                  id="numero"
                  value={  metodoFiltragem.value == 1 ? opcaoSelecionada : 0 }
                  type="number"
                  style={{height:"37px", borderRadius:"4px"}}
                  onChange={ e => setOpcaoSelecionada( e.target.value.toString() ) }
                />
              </Col>
            </Row>
            <Row className={ metodoFiltragem.value == 2  || metodoFiltragem.value == 3 ? "" : "d-none"}>
              <Col sm="12">
                <label htmlFor="opcoes">Opções</label>
                <Select
                  id="opcoes"
                  placeholder=""
                  value={ opcaoSelecionada }
                  options={ opcoesDisponiveis }
                  onChange={ e => setOpcaoSelecionada(e) }
                />
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  )
}

function ListLocaly( props ) {
  let locais = props.locais;
  const handleLocal = props.onClick;
  const handleSelectAll = props.handleSelectAll
  const handleDeselectAll = props.handleDeselectAll
  const dbClickLocal = props.onDoubleClick;
  const abrangencia = props.abrangencia

  //indica se este componente contem a lista de locais selecionados
  const isListaSelecionados = props.isListaSelecionados
  let li = [];

  locais = filtragemLocais(
    locais, 
    isListaSelecionados, 
    abrangencia,
    props.metodoFiltragem, 
    props.opcaoSelecionada
  )

  if( locais && locais.length > 0 ) {

    li = locais.map( (l, index) => (
      <LiLocal
        key={ l.id }
        onClick={ 
          isListaSelecionados 
            ? () => handleLocal( index ) 
            : index == l.dataIndex 
              ?  () => handleLocal( index )
              :  () => handleLocal( l.dataIndex  )
            }
        //onDoubleClick={ () => dbClickLocal( index ) }
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
    <>
    <UlLocal>
      { li }
    </UlLocal>
    <div>
      <Button 
        type="button" 
        style={{backgroundColor:"#4cba2b", marginBottom:"10px"}}  
        onClick={ () => handleSelectAll(locais) }
      >
        Selecionar tudo
      </Button>
    </div>
    <div>
      <Button 
        type="button" 
        style={{backgroundColor:"#c73a24"}} 
        onClick={() => handleDeselectAll(locais) }
      >
        Deselecionar tudo
      </Button>
    </div>
    
  </>
  );
}

/* 
Função responsavel por adequar a lista das localidades
*/
function filtragemLocais( locais, isListaSelecionados, abrangencia, metodoFiltragem, opcaoSelecionada){

  let l = locais

  //Retirar todos os locais que ja fazem parte de um estratro(Área de atuação)
  l = l.filter( loc => loc.flEstrato ? !loc.flEstrato : true )
    
  //Se não for a lista de locais selecionados
  if(!isListaSelecionados ){

    //Retira da lista todos os locais que ja foram selecionados
    l = l.filter( loc => loc.selecionado == false )

    //Caso a abrangencia seja por quarteirão, estará disponiveis
    //metodos para filtrar a lista
    if(abrangencia == 3 && metodoFiltragem != null &&  opcaoSelecionada != '' ){
      //filtragem por numero
      if(metodoFiltragem == 1)
        l = l.filter( loc => loc.nome == opcaoSelecionada )
      //filtragem por bairro/localidade
      else if(metodoFiltragem == 2)
        l = l.filter( loc => loc.localidade.id == opcaoSelecionada.value )
      //filtragem por zona
      else if(metodoFiltragem == 3 && opcaoSelecionada.value != null)
        l = l.filter( loc => loc.zona_id == opcaoSelecionada.value )
    }
  }

  return l
}

const mapStateToProps = (state) => ({
  atividade: state.atividade.atividade,
  locais: state.atividade.locais,
  estratos: state.atividade.estratos,
  externalReload: state.atividade.reload,
  localidades: state.localidade.localidades,
  zonas: state.zona.zonas
});

const mapDispatchToProps = dispatch =>
  bindActionCreators( { addEstrato, showNotifyToast }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalEstrato );
