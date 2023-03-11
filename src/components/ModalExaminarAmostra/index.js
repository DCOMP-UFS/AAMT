import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Row, Col } from 'react-bootstrap';
import Modal, { ModalBody, ModalFooter } from '../Modal';
import ButtonNewObject from '../ButtonNewObject';
import IconButton from '@material-ui/core/IconButton';
import { FaTrash } from 'react-icons/fa';
import SelectWrap from '../SelectWrap';
import LoadginGif from '../../assets/loading.gif'
import $ from 'jquery';

// ACTIONS
import { registrarExameRequest, registrarExameReset } from '../../store/Amostra/amostraActions';
import { getMosquitosRequest } from '../../store/Mosquito/mosquitoActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// STYLES
import { Button, FormGroup, selectDefault } from '../../styles/global';
import { PanelTitle, Container } from './styles';

export const ModalExaminarAmostra = ({ mosquitos, amostra, isOpen, handleClose, ...props }) => {
  const [ sampleSituationOptions, setsampleSituationOptions ] = useState( [
    { value: 3, label: 'Sim' },
    { value: 4, label: 'Não' }
  ] );
  const [ gnatOptions, setGnatOptions ] = useState( [] );
  const [ sampleSituation, setSampleSituation] = useState( {} );
  const [ examination, setExamination ] = useState( [] );
  const [ reload, setReload ] = useState( false );
  const [ codAmostra, setCodAmostra ] = useState( '' );
  const [ reloadAllModal, setReloadAllModal ] = useState( false );
  const [ listaExemplaresSemMosquito, setListaExemplaresSemMosquito ] = useState( [] );
  const [ flLoading, setFlLoading ] = useState( false );

  //Effect usado toda vez que o modal é aberto
  //Recarrega todas as informações do exame
  useEffect(() => {
   if(isOpen){
    setListaExemplaresSemMosquito([])
    setReloadAllModal(!reloadAllModal)
   }
   
   //Seta isOpen como false, para que quando o modal
   //for aberto novamente, o useEffect seja acionado
   handleClose()
  }, [isOpen]);

  useEffect(() => {
    props.getMosquitosRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Consultando os mosquitos na API e preenchendo as opções do select
  useEffect(() => {
    if( mosquitos.length > 0 ) {
      setGnatOptions( mosquitos.map( m => ({ value: m.id, label: m.nome }) ) );
    }
  }, [ mosquitos ]);

  // Calculando o código da amostra
  useEffect(() => {
    if( Object.entries( amostra ).length > 0 ) {

      setCodAmostra( amostra.codigo );
      
      //significa que é uma amostra foi coletada e será cadastrado o exame agora
      if(amostra.situacaoAmostra == 1 ){
        setSampleSituation( {} )
      }
      //Significa que é uma amostra examinada que houve a presença de mosquito 
      else if( amostra.exemplares.length > 0 ) {
        const option = sampleSituationOptions.find( option => option.value === 3 );
        setSampleSituation( option );

        let ex = [];
        amostra.exemplares.forEach( exemplar => {
          const index = ex.findIndex( e => e.gnat.value === exemplar.mosquito_id );

          if( index === -1 ) {
            ex.push({
              gnat: gnatOptions.find( option => option.value === exemplar.mosquito_id ),
              pulps: exemplar.fase === 1 ? exemplar.quantidade : 0,
              maggots: exemplar.fase === 2 ? exemplar.quantidade : 0,
            });
          } else {
            if( exemplar.fase === 1 )
              ex[ index ].pulps = exemplar.quantidade;
            if( exemplar.fase === 2 )
              ex[ index ].maggots = exemplar.quantidade;
          }
        });

        setExamination( ex );
      } else {
        const option = sampleSituationOptions.find( option => option.value === 4 );
        setSampleSituation( option );
        setExamination( [] );
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amostra, gnatOptions, sampleSituationOptions, reloadAllModal])

  useEffect(() => {
    if( props.exameSalvo ) {
      props.showNotifyToast("Amostra examinada com sucesso", "success")
      $( '#modal-examinar' ).modal( 'hide' );
      //setTimeout(() => { document.location.reload( true );}, 2000)
    }
    setFlLoading(false)
    props.registrarExameReset()
  }, [ props.exameSalvo ]);

  const addExamination = () => {
    let e = examination;

    e.push({
      gnat: { value: -1, label: '' }, // mosquito
      pulps: 0,
      maggots: 0, // larvas
    });

    setExamination( e );
    setReload( !reload );
  };

  const changeGnat = ( gnat, index ) => {
    let e = examination;
    e[ index ].gnat = gnat;

    setExamination( e );
    setReload( !reload );
  }

  const changePulps = ( pulps, index ) => {
    let e = examination;
    e[ index ].pulps = pulps;

    setExamination( e );
    setReload( !reload );
  }

  const changeMaggots = ( maggots, index ) => {
    let e = examination;
    e[ index ].maggots = maggots;

    setExamination( e );
    setReload( !reload );
  }

  const removerExame = index => {
    let ex = examination;

    ex.splice( index, 1 );

    setExamination( ex );
    setReload( !reload );
  }

  const submit = e => {
    e.preventDefault();
    if(sampleSituation.label == 'Não'){
      const data = {
        "id": amostra.id,
        "situacaoAmostra": sampleSituation.value,
        "exemplares": []
      };

      setFlLoading(true)
      props.registrarExameRequest( data );
    }
    else{
      let indexExemplaresSemMosquito = exemplaresSemMosquito()

      if(examination.length == 0)
        props.showNotifyToast( "Por favor adicione ao menos um exame", "warning" );
      else if(indexExemplaresSemMosquito.length > 0){
        props.showNotifyToast( "Existem exemplares onde o tipo de mosquito não foi definido", "error" );
      }
      else if(existeMosquitosIguais()){
        props.showNotifyToast( "Não pode inserir dois ou mais mosquitos do mesmo tipo", "warning" );
      }
      else{
        const exemplary = examination.reduce(( exem, ex ) => {
          const e = [
            {
              "amostra_id": amostra.id,
              "quantidade": ex.pulps,
              "fase": 1, // Pulpa - Pulps
              "mosquito_id": ex.gnat.value
            },
            {
              "amostra_id": amostra.id,
              "quantidade": ex.maggots,
              "fase": 2, // Larva - Maggots
              "mosquito_id": ex.gnat.value
            },
          ];

          return ([ ...exem, ...e ]);
        }, [] );

        var situacaoAmostra = 4 // NEGATIVA
        
        //Percorre os exemplares até que encontre um que contenha um mosquito transmissor de dengue 
        //(Aedes aegypti ou Aedes albopictus).
        for( var index in exemplary){
          if(exemplary[index].mosquito_id == 1 || exemplary[index].mosquito_id == 2){
            situacaoAmostra = 3 //POSITIVA
            break
          }
        }

        const data = {
          "id": amostra.id,
          "situacaoAmostra": situacaoAmostra,
          "exemplares": exemplary
        };

        setFlLoading(true)
        props.registrarExameRequest( data );
      }
    }
  }

  function existeMosquitosIguais() {
    if(examination.length == 0)
      return false

    for(var i = 0; i < (examination.length - 1); i++){
      var aux1 = examination[i].gnat.value
      for(var j = i +1; j < examination.length; j++){
        if(aux1 == examination[j].gnat.value)
          return true
      }
    }

    return false
  }

  //Retornan uma lista de index de todos os exames que
  //estam sem um tipo de mosquito definido
  function exemplaresSemMosquito() {

    let listaIndexExemplaresSemMosquitos = []
    for(var i = 0; i < examination.length; i++){
      //siginifica que neste exame o tipo de mosquito não foi selecionado
      if(examination[i].gnat.value == -1)
        listaIndexExemplaresSemMosquitos.push(i)
    }
    setListaExemplaresSemMosquito(listaIndexExemplaresSemMosquitos)

    return listaIndexExemplaresSemMosquitos
  }

  //Define estilo do acordion que contem o exame com index informado
  function definirClasseAcordion(index){
    let estilo = ''

    //significa que o exame é valido, pois o tipo do mosquito foi informado
    //o estilo do acordion será o padrão
    if(listaExemplaresSemMosquito.find(indexExemplar => indexExemplar == index) == undefined)
      estilo = "expansion"
    else{
      //significa que o exame não teve o seu mosquito informado, o que o torna invalido
      //o estilo do acordion terá uma borda vermelha indicando o error
      estilo = "expansion-error"
    }

    //Caso a situação do exemplar seja 'não'(Não foi encontrado nenhum traço de mosquito na amostra)
    //Os exames que foram adicionados anteriomente serão ocultados para o usuario atraves da adição
    //da classe "d-none" no estilo
    if(sampleSituation.label == 'Não' )
      estilo = estilo + " d-none"
    
    return estilo
  }

  return (
    <Modal id={ props.id } title={ 
      amostra.situacaoAmostra == 3 || amostra.situacaoAmostra == 4 ?
      `Exame da amostra cód. ${ codAmostra }` :  `Examinar amostra cód. ${ codAmostra }`
      }>
      <Container>
        <form onSubmit={ submit }>
          <ModalBody>
            <div className={amostra.situacaoAmostra == 3 || amostra.situacaoAmostra == 4 ? "d-none" : ""}>
              <p className="text-description">
                <code>OBS1</code>: Os campos com <code>*</code> são obrigatórios
              </p>
              <p className="text-description">
                <code>OBS2</code>: O exame após cadastrado não poderá ser mais alterado
              </p>
              </div>
            <FormGroup>
              <label htmlFor="situacaoAmostra">Positivo para algum mosquito?<code>*</code></label>
              <SelectWrap
                id="situacaoAmostra"
                styles={ selectDefault }
                options={ sampleSituationOptions }
                value={ sampleSituation }
                onChange={ e => setSampleSituation( e ) }
                required
                isDisabled={amostra.situacaoAmostra == 3 || amostra.situacaoAmostra == 4}
              />
            </FormGroup>
              {
                examination.map( ( exa, index ) => (
                  <Accordion key={ index } className={ definirClasseAcordion(index) }>
                    <AccordionSummary
                      expandIcon={ <ExpandMoreIcon /> }
                      aria-controls={ "panel-side-content-" + 0 }
                      id={ "panel-side-" + 0 }
                    >
                      <PanelTitle>
                        <p>{ exa.gnat.label }</p>
                        <small>Mosquito</small>
                      </PanelTitle>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label>Mosquito<code>*</code></label>
                              <Select
                                styles={ selectDefault }
                                value={ exa.gnat }
                                options={ gnatOptions }
                                onChange={ e => changeGnat( e, index ) }
                                required
                                isDisabled={amostra.situacaoAmostra == 3 || amostra.situacaoAmostra == 4}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="6">
                            <FormGroup>
                              <label>Pulpas</label>
                              <input
                                value={ exa.pulps }
                                type="number"
                                className="form-control"
                                onChange={ e => { changePulps( parseInt( e.target.value == '' ? 0 : e.target.value ), index ) } }
                                min={ 0 }
                                required
                                disabled={amostra.situacaoAmostra == 3 || amostra.situacaoAmostra == 4}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="12" md="6">
                            <FormGroup>
                              <label>Larvas</label>
                              <input
                                value={ exa.maggots }
                                type="number"
                                className="form-control"
                                onChange={ e => { changeMaggots( parseInt( e.target.value == '' ? 0 : e.target.value ), index ) } }
                                min={ 0 }
                                required
                                disabled={amostra.situacaoAmostra == 3 || amostra.situacaoAmostra == 4}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12" className="text-right">
                            <IconButton
                              title="Remover"
                              className={ amostra.situacaoAmostra == 3 || amostra.situacaoAmostra == 4 ? 'd-none' : "text-danger" }
                              aria-label="cart"
                              onClick={ () => removerExame( index ) }
                            >
                              <FaTrash className="icon-sm" />
                            </IconButton>
                          </Col>
                        </Row>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))
              }
            <hr/>
            <div>
              <ButtonNewObject
                title="Adicionar Exame"
                className={ amostra.situacaoAmostra == 3 || amostra.situacaoAmostra == 4 || sampleSituation.label == 'Não' ? "d-none" : ""  }
                onClick={ () => addExamination() }
                disabled={ examination.length == mosquitos.length ? true : false }
              />
            </div>
          </ModalBody>
          <ModalFooter >
            <Button 
              className={ amostra.situacaoAmostra == 3 || amostra.situacaoAmostra == 4 ? 'd-none' : "secondary" }
              data-dismiss="modal" 
              disabled={ flLoading }>
                Cancelar
            </Button>
            <Button 
              className={ amostra.situacaoAmostra == 3 || amostra.situacaoAmostra == 4 ? 'd-none' : "info"} 
              type="submit" 
              disabled={ flLoading }>
                {
                flLoading ?
                  (
                    <>
                      <img
                        src={ LoadginGif }
                        width="25"
                        style={{ marginRight: 10 }}
                        alt="Carregando"
                      />
                      Salvando...
                    </>
                  ) :
                  "Salvar"
                }
            </Button>
          </ModalFooter>
        </form>
      </Container>
    </Modal>
  )
}

const mapStateToProps = state => ( {
  amostra   : state.amostra.amostra,
  mosquitos : state.nw_mosquito.mosquitos,
  exameSalvo: state.amostra.exameSalvo,
} );

const mapDispatchToProps = {
  registrarExameRequest,
  getMosquitosRequest,
  showNotifyToast,
  registrarExameReset
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalExaminarAmostra )
