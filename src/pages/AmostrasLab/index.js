import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from '../../components/Table';
import { FaSearch, FaVial } from 'react-icons/fa';
import { Row } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ModalExaminar from './components/ModalExaminar';
import $ from 'jquery';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getAmostrasByLab, enviarAmostrasRequest, setAmostra } from '../../store/Amostra/amostraActions';

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
    //Não permite que amostras com situação positiva, negativa ou encaminhada
    //sejam selecionados para serem encaminhadas
    isRowSelectable: (dataIndex) => {
      return (rows[dataIndex][4] != "Positiva" && rows[dataIndex][4] != "Negativa" && rows[dataIndex][4] != "Encaminhada")
    },
  };

  useEffect( () => {
    props.changeSidebar( "amostra" );
    props.getAmostrasByLab( usuario.laboratorio.id );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  useEffect( () => {
    let r = rows;

    r = amostras.map( ( amostra, index ) => {
      const trabalhoDiario  = amostra.trabalhoDiario;
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
        situacaoAmostra,
        <Tooltip
          className="bg-warning text-white"
          title="Examinar"
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

            <ModalExaminar id="modal-examinar" isOpen={openModalExaminar} handleClose={handleCloseModalExaminar}/>
            
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
  enviarAmostrasRequest,
  setAmostra
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AmostrasLab );
