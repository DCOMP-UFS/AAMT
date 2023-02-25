import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from '../../components/Table';
import { FaSearch, FaVial } from 'react-icons/fa';
import { Row } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ModalExaminarAmostra from '../../components/ModalExaminarAmostra';
import $ from 'jquery';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getAmostrasByLab, setAmostra } from '../../store/Amostra/amostraActions';

// STYLES
import { PageIcon, PageHeader } from '../../styles/util';
import { Container } from './styles';

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
    name: "dataEncaminhamento",
    label: "Recebido Em",
    options: {
      filter: false,
      sortCompare: ordenadorData
    }
  },
  {
    name: "dataExame",
    label: "Examinado Em",
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
  "Situação",
  {
    name: "acoes",
    label: "Ações",
    options: {
      filter: false
    }
  }
];

export const AmostrasLab = ({ laboratorios, amostras, usuario, ...props }) => {
  const [ rows, setRows ] = useState( [] );
  const [ openModalExaminar, setOpenModalExaminar] = useState(false)

  const handleCloseModalExaminar = () => {setOpenModalExaminar(false)}

  const options = {
    selectableRows: 'none'
  };

  useEffect( () => {
    props.changeSidebar( "amostra" );
    props.getAmostrasByLab( usuario.laboratorio.id );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  useEffect( () => {
    let r = rows;

    r = amostras.map( ( amostra, index ) => {
      const metodologia            = amostra.atividade.metodologia;
      const objetivo               = amostra.atividade.objetivo;
      const dataEncaminhamento     = amostra.dataEncaminhamento.split( '-' );
      const dataExame              = amostra.dataExaminado ? amostra.dataExaminado.split( '-' ) : null

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
        `${dataEncaminhamento[ 2 ] }/${ dataEncaminhamento[ 1 ] }/${ dataEncaminhamento[ 0 ] }`,
        dataExame == null ? dataExame : `${dataExame[ 2 ] }/${ dataExame[ 1 ] }/${ dataExame[ 0 ] }`,
        metodologia.sigla,
        objetivo.sigla,
        situacaoAmostra,
        <Tooltip
          className="bg-warning text-white"
          title= { amostra.situacaoAmostra === 2 ? "Examinar" : "Visualizar Exame"}
          onClick={ () => handlerSample( index ) }
        >
          <IconButton aria-label="Examinar">
            {
              amostra.situacaoAmostra === 2 ? <FaVial /> : <FaSearch />
            }
            
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

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaVial /></PageIcon>
          Exames de Amostras
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
            
          </article>
        </Row>
      </section>
    </Container>
  );
}

const mapStateToProps = state => ( {
  usuario     : state.appConfig.usuario,
  amostras    : state.amostra.amostras,
} );

const mapDispatchToProps = {
  changeSidebar,
  getAmostrasByLab,
  setAmostra
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AmostrasLab );
