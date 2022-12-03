import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from '../../components/Table';
import { FaVial } from 'react-icons/fa';
import { Row } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import Select from 'react-select';
import ModalExaminarAmostra from '../../components/ModalExaminarAmostra';
import $ from 'jquery';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getAmostrasByLab, getAmostrasRequest, enviarAmostrasRequest, setAmostra } from '../../store/Amostra/amostraActions';
import { getLaboratoriosRequest } from '../../store/Laboratorio/laboratorioActions';

// STYLES
import { Button, FormGroup, selectDefault } from '../../styles/global';
import { PageIcon, PageHeader } from '../../styles/util';
import { Container } from './styles';
import { TramRounded } from '@material-ui/icons';

//UTILIES FUNCTIONS
import { ordenadorData } from '../../config/function';

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
      filter: false,
      sortCompare: ordenadorData
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

export const Amostras = ({ laboratorios, amostras, usuario, ...props }) => {
  const [ rows, setRows ] = useState( [] );
  const [ rowsSelected, setRowsSelected ] = useState( [] );
  const [ laboratoriosOptions, setLaboratoriosOptions ] = useState( [] );
  const [ laboratorioSelect, setLaboratorioSelect ] = useState( { value: null, label: '' } );
  const [ openModalExaminar, setOpenModalExaminar] = useState(false)

  const handleCloseModalExaminar = () => {setOpenModalExaminar(false)}

  const options = {
    //Não permite que amostras com situação positiva, negativa ou encaminhada
    //sejam selecionados para serem encaminhadas
    isRowSelectable: (dataIndex) => {
      return (rows[dataIndex][5] != "Positiva" && rows[dataIndex][5] != "Negativa" && rows[dataIndex][5] != "Encaminhada")
    },
    customToolbarSelect: () => {
      return (
        <Button
          type="button"
          className="info"
          data-toggle="modal"
          data-target="#modal-encaminhar"
        >Encaminhar Amostras</Button>
      );
    },
    onRowsSelect : ( curRowSelected, allRowsSelected ) => {
      setRowsSelected( allRowsSelected.map( ({ dataIndex }) => dataIndex ) );
    }
  };

  useEffect( () => {
    props.changeSidebar( "amostra" );
    props.getAmostrasRequest( usuario.id );
    props.getLaboratoriosRequest( usuario.municipio.id );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  useEffect(() => {
    if( laboratorios.length > 0 ) {
      setLaboratoriosOptions( laboratorios.map( lab => ( {
        value: lab.id, label: lab.nome
      } ) ) );
    }
  }, [ laboratorios ]);

  useEffect( () => {
    let r = rows;

    r = amostras.map( ( amostra, index ) => {
      const trabalhoDiario  = amostra.trabalhoDiario;
      const ciclo           = amostra.ciclo;
      const metodologia     = amostra.atividade.metodologia;
      const objetivo        = amostra.atividade.objetivo;
      const data            = trabalhoDiario.data.split( '-' );

      let situacaoAmostra = '';
      if( amostra.situacaoAmostra === 1 )
        situacaoAmostra = 'Coletada';
      if( amostra.situacaoAmostra === 2 )
        situacaoAmostra = 'Encaminhada';
      if( amostra.situacaoAmostra === 3 )
        situacaoAmostra = 'Positiva';
      if( amostra.situacaoAmostra === 4 )
        situacaoAmostra = 'Negativa';

      return [
        amostra.codigo,
        `${ data[ 2 ] }/${ data[ 1 ] }/${ data[ 0 ] }`,
        metodologia.sigla,
        objetivo.sigla,
        `${ ciclo.ano }.${ ciclo.sequencia }`,
        situacaoAmostra,
        <Tooltip
          className="bg-warning text-white"
          title="Examinar"
          onClick={ () => handlerSample( index ) }
        >
          <IconButton aria-label="Examinar">
            <FaVial />
          </IconButton>
        </Tooltip>,
      ]
    } );
    setRows( r );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ amostras ] );

  const handlerSample = index => {
    props.setAmostra( amostras[ index ] );
    setOpenModalExaminar(true)
    $( '#modal-examinar' ).modal( 'show' );
  }

  const enviarAmostras = e => {
    e.preventDefault();

    if( laboratorioSelect.value ) {
      const amostras_ids = rowsSelected.map( r => amostras[ r ].id );

      props.enviarAmostrasRequest( laboratorioSelect.value, amostras_ids );
    }
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

            <ModalExaminarAmostra id="modal-examinar" isOpen={openModalExaminar} handleClose={handleCloseModalExaminar}/>

            <Modal id="modal-encaminhar" title="Encaminhar amostras">
              <form onSubmit={ e => enviarAmostras( e ) }>
                <ModalBody>
                  <FormGroup>
                    <label htmlFor="laboratorio">Laboratório <code>*</code></label>
                    <Select
                      id="laboratorio"
                      value={ laboratorioSelect }
                      options={ laboratoriosOptions }
                      styles={ selectDefault }
                      onChange={ e => setLaboratorioSelect( e ) }
                      className={ laboratorioSelect.value ? '' : 'invalid' }
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button className="secondary" data-dismiss="modal">Cancelar</Button>
                  <Button type="submit" className="info">Salvar</Button>
                </ModalFooter>
              </form>
            </Modal>
          </article>
        </Row>
      </section>
    </Container>
  );
}

const mapStateToProps = state => ( {
  usuario     : state.appConfig.usuario,
  amostras    : state.amostra.amostras,
  laboratorios: state.nw_laboratorio.laboratorios
} );

const mapDispatchToProps = {
  changeSidebar,
  getAmostrasRequest,
  getAmostrasByLab,
  getLaboratoriosRequest,
  enviarAmostrasRequest,
  setAmostra
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Amostras );
