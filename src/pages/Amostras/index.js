import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from '../../components/Table';
import { FaVial } from 'react-icons/fa';
import { Row } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import Select from 'react-select';
import ModalExaminar from './components/ModalExaminar';
import $ from 'jquery';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getAmostrasByLab, getAmostrasRequest, enviarAmostrasRequest, setAmostra } from '../../store/Amostra/amostraActions';
import { getLaboratoriosRequest, getLaboratoryRequest } from '../../store/Laboratorio/laboratorioActions';

// STYLES
import { Button, FormGroup, selectDefault } from '../../styles/global';
import { PageIcon, PageHeader } from '../../styles/util';
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

export const Amostras = ({ laboratorios, amostras, usuario, ...props }) => {
  const [ rows, setRows ] = useState( [] );
  const [ rowsSelected, setRowsSelected ] = useState( [] );
  const [ tableName, settableName ] = useState( " " );
  const [ laboratoriosOptions, setLaboratoriosOptions ] = useState( [] );
  const [ laboratorioSelect, setLaboratorioSelect ] = useState( { value: null, label: '' } );

  //Se o usuario for laboratorista, ele não poderá selecionar as linhas da tabela
  let selectable;
  if(usuario.atuacoes[0].tipoPerfil === 5){
    selectable = 'none'
  }else{
    selectable = 'multiple'
  }

  const options = {
    selectableRows: selectable,
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
    // Se o usuario for coordenador retorna todos os labs, se for laboratorista retorna o lab do laboratorista
    if( selectable === "multiple" ){
      settableName("Amostras");
      props.laboratorio = null;
      props.getLaboratoriosRequest( usuario.municipio.id );
    }else if ( selectable === "none" ){
      laboratorios = null;
      props.getLaboratoryRequest();
    }
    props.getAmostrasRequest( usuario.id );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  useEffect(() => {
    if( laboratorios != null && laboratorios.length > 0 ) {
      setLaboratoriosOptions( laboratorios.map( lab => ( {
        value: lab.id, label: lab.nome
      } ) ) );
    }
    if ( props.laboratorio ){
      settableName("Amostras do " + props.laboratorio.nome);
    }
  }, [ laboratorios, props.laboratorio ]);

  useEffect( () => {
    let r = rows;

    r = amostras.map( ( amostra, index ) => {
      const trabalhoDiario  = amostra.trabalhoDiario;
      const ciclo           = amostra.ciclo;
      //console.log(amostra);
      const metodologia     = amostra.atividade.metodologia;
      const objetivo        = amostra.atividade.objetivo;
      //const metodologia = null;
      //const objetivo = null;
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
        //amostra.codigo,
        amostra.id,
        `${ data[ 2 ] }/${ data[ 1 ] }/${ data[ 0 ] }`,
        metodologia.sigla,
        objetivo.sigla,
        //null,
        //null,
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

    $( '#modal-examinar' ).modal( 'show' );
  }

  const enviarAmostras = e => {
    e.preventDefault();

    if( laboratorioSelect.value ) {
      const amostras_ = rowsSelected.map( r => amostras[ r ] );

      props.enviarAmostrasRequest( laboratorioSelect.value, amostras_ );
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
              title={ tableName }
              columns={ columns }
              data={ rows }
              options={ options }
            />

            <ModalExaminar id="modal-examinar" />
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
  laboratorios: state.nw_laboratorio.laboratorios,
  laboratorio : state.nw_laboratorio.laboratorio
} );

const mapDispatchToProps = {
  changeSidebar,
  getAmostrasRequest,
  getAmostrasByLab,
  getLaboratoriosRequest,
  getLaboratoryRequest,
  enviarAmostrasRequest,
  setAmostra
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Amostras );
