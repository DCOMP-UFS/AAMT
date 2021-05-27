import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Row, Col } from 'react-bootstrap';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';
import ButtonNewObject from '../../../../../components/ButtonNewObject';
import IconButton from '@material-ui/core/IconButton';
import { FaTrash } from 'react-icons/fa';

// ACTIONS
import { registrarExameRequest } from '../../../../../store/Amostra/amostraActions';
import { getMosquitosRequest } from '../../../../../store/Mosquito/mosquitoActions';

// STYLES
import { Button, FormGroup, selectDefault } from '../../../../../styles/global';
import { PanelTitle, Container } from './styles';

export const ModalExaminar = ({ mosquitos, amostra, ...props }) => {
  const [ sampleSituationOptions, setsampleSituationOptions ] = useState( [
    { value: 3, label: 'Sim' },
    { value: 4, label: 'Não' }
  ] );
  const [ gnatOptions, setGnatOptions ] = useState( [] );
  const [ sampleSituation, setSampleSituation] = useState( {} );
  const [ examination, setExamination ] = useState( [] );
  const [ reload, setReload ] = useState( false );
  const [ codAmostra, setCodAmostra ] = useState( '' );

  useEffect(() => {
    props.getMosquitosRequest();
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
      const seqAmostra      = amostra.sequencia,
            seqDeposito     = amostra.deposito.sequencia,
            seqVistoria     = amostra.vistoria.sequencia,
            trabalhoDiario  = amostra.trabalhoDiario,
            data            = trabalhoDiario.data.split( '-' );

      setCodAmostra( `${ data[ 2 ] + data[ 1 ] + data[ 0 ] }.1.${ seqVistoria }.${ seqDeposito }.${ seqAmostra }` );

      // Preenchendo os dados da amostra caso já exista exame cadastrado
      const option = sampleSituationOptions.find( option => option.value === amostra.situacaoAmostra );
      if( option )
        setSampleSituation( option );
      else
        setSampleSituation( {} );

      if( amostra.exemplares.length > 0 ) {
        let ex = examination;
        amostra.exemplares.forEach( exemplar => {
          const index = ex.findIndex( e => e.gnat.value === exemplar.mosquito_id );

          if( index === -1 ) {
            ex.push({
              gnat: gnatOptions.find( option => option.value === exemplar.mosquito_id ),
              eggs: exemplar.fase === 1 ? exemplar.quantidade : 0,
              pulps: exemplar.fase === 2 ? exemplar.quantidade : 0,
              pulpExuvia: exemplar.fase === 3 ? exemplar.quantidade : 0,
              maggots: exemplar.fase === 4 ? exemplar.quantidade : 0,
              adults: exemplar.fase === 5 ? exemplar.quantidade : 0
            });
          } else {
            if( exemplar.fase === 1 )
              ex[ index ].eggs = exemplar.quantidade;
            if( exemplar.fase === 2 )
              ex[ index ].pulps = exemplar.quantidade;
            if( exemplar.fase === 3 )
              ex[ index ].pulpExuvia = exemplar.quantidade;
            if( exemplar.fase === 4 )
              ex[ index ].maggots = exemplar.quantidade;
            if( exemplar.fase === 5 )
              ex[ index ].adults = exemplar.quantidade;
          }
        });

        setExamination( ex );
      } else {
        setExamination( [] );
      }
    }
  }, [ amostra ])

  const addExamination = () => {
    let e = examination;

    e.push({
      gnat: { value: -1, label: '' }, // mosquito
      eggs: 0,
      pulps: 0,
      pulpExuvia: 0,
      maggots: 0, // larvas
      adults: 0
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

  const changeEggs = ( eggs, index ) => {
    let e = examination;
    e[ index ].eggs = eggs;

    setExamination( e );
    setReload( !reload );
  }

  const changePulps = ( pulps, index ) => {
    let e = examination;
    e[ index ].pulps = pulps;

    setExamination( e );
    setReload( !reload );
  }

  const changePulpExuvia = ( pulpExuvia, index ) => {
    let e = examination;
    e[ index ].pulpExuvia = pulpExuvia;

    setExamination( e );
    setReload( !reload );
  }

  const changeMaggots = ( maggots, index ) => {
    let e = examination;
    e[ index ].maggots = maggots;

    setExamination( e );
    setReload( !reload );
  }

  const changeAdults = ( adults, index ) => {
    let e = examination;
    e[ index ].adults = adults;

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

    const exemplary = examination.reduce(( exem, ex ) => {
      const e = [
        {
          "amostra_id": amostra.id,
          "quantidade": ex.eggs,
          "fase": 1, // Ovo - Eggs
          "mosquito_id": ex.gnat.value
        },
        {
          "amostra_id": amostra.id,
          "quantidade": ex.pulps,
          "fase": 2, // Pulpa - Pulps
          "mosquito_id": ex.gnat.value
        },
        {
          "amostra_id": amostra.id,
          "quantidade": ex.pulpExuvia,
          "fase": 3, // Exúvia de Pulpa - Pulp Exuvia
          "mosquito_id": ex.gnat.value
        },
        {
          "amostra_id": amostra.id,
          "quantidade": ex.maggots,
          "fase": 4, // Larva - Maggots
          "mosquito_id": ex.gnat.value
        },
        {
          "amostra_id": amostra.id,
          "quantidade": ex.adults,
          "fase": 5, // Adulto - adults
          "mosquito_id": ex.gnat.value
        }
      ];

      return ([ ...exem, ...e ]);
    }, [] );

    const data = {
      "id": amostra.id,
      "situacaoAmostra": sampleSituation.value,
      "exemplares": exemplary
    };

    props.registrarExameRequest( data );
  }

  return (
    <Modal id={ props.id } title={ `Examinar amostra cód. ${ codAmostra }`}>
      <Container>
        <form onSubmit={ submit }>
          <ModalBody>
            <FormGroup>
              <label htmlFor="situacaoAmostra">Positivo para aedes aegypti?<code>*</code></label>
              <Select
                id="situacaoAmostra"
                styles={ selectDefault }
                options={ sampleSituationOptions }
                value={ sampleSituation }
                onChange={ e => setSampleSituation( e ) }
                required
              />
            </FormGroup>
              {
                examination.map( ( exa, index ) => (
                  <Accordion key={ index } className="expansion">
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
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="6">
                            <FormGroup>
                              <label>Ovos</label>
                              <input
                                value={ exa.eggs }
                                type="number"
                                className="form-control"
                                onChange={ e => { changeEggs( parseInt( e.target.value == '' ? 0 : e.target.value ), index ) } }
                                min={ 0 }
                                required
                              />
                            </FormGroup>
                          </Col>
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
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="6">
                            <FormGroup>
                              <label>Exúvias de Pulpa</label>
                              <input
                                value={ exa.pulpExuvia }
                                type="number"
                                className="form-control"
                                onChange={ e => { changePulpExuvia( parseInt( e.target.value == '' ? 0 : e.target.value ), index ) } }
                                min={ 0 }
                                required
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
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label>Adultos</label>
                              <input
                                value={ exa.adults }
                                type="number"
                                className="form-control"
                                onChange={ e => { changeAdults( parseInt( e.target.value == '' ? 0 : e.target.value ), index ) } }
                                min={ 0 }
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12" className="text-right">
                            <IconButton
                              title="Remover"
                              className="text-danger"
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
                onClick={ () => addExamination() }
                disabled={ examination.length == mosquitos.length ? true : false }
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="secondary" data-dismiss="modal">Cancelar</Button>
            <Button className="info" type="submit">Salvar</Button>
          </ModalFooter>
        </form>
      </Container>
    </Modal>
  )
}

const mapStateToProps = state => ({
  amostra: state.nw_amostra.amostra,
  mosquitos: state.nw_mosquito.mosquitos,
})

const mapDispatchToProps = {
  registrarExameRequest,
  getMosquitosRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalExaminar )
