import React, { useState } from 'react';
import { connect } from 'react-redux';
import Table from '../../../components/Table';
import { FaVial } from 'react-icons/fa';
import { Row } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import Select from 'react-select';
import ModalExaminar from './components/ModalExaminar';
import $ from 'jquery';

// STYLES
import { Button, FormGroup, selectDefault } from '../../../styles/global';
import { PageIcon, PageHeader } from '../../../styles/util';
import { Container } from './styles';

const columns = [
  {
    name: "codigo",
    label: "Cód. Amostra",
    options: {
      filter: false
    }
  },
  {
    name: "createdAt",
    label: "Coletada Em",
    options: {
      filter: false
    }
  },
  "Atividade",
  {
    name: "objetivo",
    label: "Objetivo",
    options: {
      filter: false
    }
  },
  {
    name: "ciclo",
    label: "Ciclo",
    options: {
      filter: false
    }
  },
  "Situação",
  {
    name: "acoes",
    label: "Ações",
    options: {
      filter: false
    }
  }
];

export const Amostras = ({ ...props }) => {
  const [ rows, setRows ] = useState([
    [
      '14042021.1.1.1.1',
      '14/04/2021',
      'PNCD',
      'LI+T',
      '2021.2',
      'Coletada',
      <Tooltip
        className="bg-warning text-white"
        title="Examinar"
        onClick={ () => handlerSample( 0 ) }
      >
        <IconButton aria-label="Examinar">
          <FaVial />
        </IconButton>
      </Tooltip>,
    ],
    [
      '14042021.1.1.1.2',
      '14/04/2021',
      'PNCD',
      'LI+T',
      '2021.2',
      'Coletada',
      <Tooltip
        className="bg-warning text-white"
        title="Examinar"
        onClick={ () => handlerSample( 1 ) }
      >
        <IconButton aria-label="Examinar">
          <FaVial />
        </IconButton>
      </Tooltip>,
    ]
  ]);
  const [ rowsSelected, setRowsSelected ] = useState([]);
  const options = {
    customToolbarSelect: ({ data }) => {
      console.log( data );
      return (
        <Button
          type="button"
          className="info"
          data-toggle="modal"
          data-target="#modal-encaminhar"
        >Encaminhar Amostras</Button>
      );
    }
  };

  const handlerSample = index => {
    console.log( index );
    $( '#modal-examinar' ).modal( 'show' );
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaVial /></PageIcon>
          Coleta de Amostras
        </h3>
      </PageHeader>
      <section className="card-list">
        <Row>
          <article className="col-md-12 stretch-card">
            <Table
              title={ `Amostras` }
              columns={ columns }
              data={ rows }
              options={ options }
            />

            <ModalExaminar id="modal-examinar" />
            <Modal id="modal-encaminhar" title="Encaminhar amostras">
              <ModalBody>
                <FormGroup>
                  <label htmlFor="laboratorio">Laboratório <code>*</code></label>
                  <Select
                    id="laboratorio"
                    styles={ selectDefault }
                    onChange={ e => {  }}
                    required
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button className="secondary" data-dismiss="modal">Cancelar</Button>
                <Button className="info" onClick={ () => {} }>Salvar</Button>
              </ModalFooter>
            </Modal>
          </article>
        </Row>
      </section>
    </Container>
  );
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Amostras )
