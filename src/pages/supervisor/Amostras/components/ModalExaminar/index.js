import React, { useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Row, Col } from 'react-bootstrap';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/Modal';
import ButtonNewObject from '../../../../../components/ButtonNewObject';

// STYLES
import { Button, FormGroup, selectDefault } from '../../../../../styles/global';
import { PanelTitle, Container } from './styles';

export const ModalExaminar = ({ ...props }) => {
  const [ sampleSituationOptions, setsampleSituationOptions ] = useState( [
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' }
  ] );
  const [ gnatOptions, setGnatOptions ] = useState( [
    { value: 'aedes_aegypti', label: 'Aedes aegypti' },
    { value: 'aedes_albupictus', label: 'Aedes albupictus' }
  ] );
  const [ sampleSituation, setSampleSituation] = useState( {} );
  const [ examination, setExamination ] = useState( [] );
  const [ reload, setReload ] = useState( false );

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

  return (
    <Modal id={ props.id } title="Encaminhar amostras">
      <Container>
        <form>
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
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))
              }
            <hr/>
            <div>
              <ButtonNewObject title="Adicionar Exame" onClick={ () => addExamination() } />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="secondary" data-dismiss="modal">Cancelar</Button>
            <Button className="info" onClick={ () => {} }>Salvar</Button>
          </ModalFooter>
        </form>
      </Container>
    </Modal>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalExaminar )
