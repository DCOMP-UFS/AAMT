/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Table, { ButtonAdd, ButtonDesabled } from '../../components/Table';
import Typography from "@material-ui/core/Typography";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { FaEdit, FaTrashAlt,} from 'react-icons/fa';
import { Container, Row } from 'react-bootstrap';
import ModalEditarRua from './components/ModalEditar'
import ModalExcluirRua from './components/ModalExcluir'
import ModalAddRua from './components/ModalAdd'
import $ from "jquery";

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getQuarteiroesMunicipioRequest } from '../../store/Quarteirao/quarteiraoActions';
import { changeTableSelected } from '../../store/SupportInfo/supportInfoActions';
import { getStreetByCityRequest } from '../../store/Rua/ruaActions';


// STYLES
import { GlobalStyle } from './styles';
import { PageIcon, PageHeader } from '../../styles/util';

const columns = [
  {
    name: "index",
    label: "#",
    options: {
      viewColumns: false,
      filter: false,
      display: "false",
      customBodyRender: (value, tableMeta, updateValue) => (
        <Typography data-id={value.id}>{value.index}</Typography>
      ),
    },
  },
  {
    name: "CEP",
    label: "CEP",
    options: {
      filter: false,
    },
  },
  {
    name: "Nome",
    label: "Nome",
    options: {
      filter: false,
    },
  },
  {
    name: "acoes",
    label: "Ações",
    options: {
      filter: false
    }
  }
];

const Ruas = ({ quarteiroes, tableSelection, ruas, ...props }) => {
  const [ rows, setRows ] = useState([]);
  const [ rowsSelected, setRowsSelected ] = useState([]);
  const [ showModalAddRua, setShowModalAddRua] = useState(false)
  const [ rua, setRua] = useState({})
  const [ indexRua, setIndexRua] =  useState( -1 )
  const [openModalEditStreet, setOpenModalEditStreet] =useState(false)

  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          title="Adicionar"
          data-toggle="modal"
          data-target="#modal-add-rua"
          onClick={() => {setShowModalAddRua(true)}} />
      );
    },
    selectableRows: 'none' 
  };

  useEffect(() => {
    props.changeSidebar( "rua" );
    props.getStreetByCityRequest( props.municipio.id );
  }, []);

  useEffect(() => {
    createRows();
  }, [ ruas ]);

  function createRows() {
    const list = ruas.map( (rua, index) => {
      return([
        { index: (index + 1), id: rua.id },
        rua.cep.slice(0,5)+"-"+rua.cep.slice(5),
        rua.nome,
        <Container>
          <Row>
            <div style={{marginRight:"5px"}}>
                <Tooltip
                  className="bg-warning text-white"
                  title= "Editar"
                  onClick={ () => handlerEditStreet(index) }
                >
                  <IconButton aria-label="Examinar">
                    <FaEdit />
                  </IconButton>
                </Tooltip>
              </div>
                <Tooltip
                  className="bg-warning text-white"
                  title= "Excluir"
                  onClick={ () => handlerDeleteStreet(index) }
                >
                  <IconButton aria-label="Examinar">
                    <FaTrashAlt />
                  </IconButton>
                </Tooltip>
              
          </Row>
        </Container>   
      ])
    });

    setRows( list );
  }

  const handlerEditStreet = index => {
      setIndexRua(index)
      setRua( ruas[ index ] );
      setOpenModalEditStreet(true)
      $( '#modal-editar-rua' ).modal( 'show' );
  }

  const handlerDeleteStreet = index => {
    setIndexRua(index)
    setRua( ruas[ index ] );
    $( '#modal-excluir-rua' ).modal( 'show' );
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><LocationCityIcon /></PageIcon>
          Logradouros
        </h3>
      </PageHeader>
      <section className="card-list">
        <GlobalStyle />
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <Table
              title={`Logradouros de ${ props.municipio.nome }`}
              columns={ columns }
              data={ rows }
              options={ options }
            />
          </article>
        </div>
        <ModalAddRua
          id="modal-add-rua"
          show={showModalAddRua}
          handleClose={() => { setShowModalAddRua(false) } 
        }
        />
        <ModalEditarRua
          id="modal-editar-rua"
          show={openModalEditStreet}
          handleClose={ () => setOpenModalEditStreet(false)}
          rua={rua}
        />
        <ModalExcluirRua
          id="modal-excluir-rua"
          ruaId={rua.id}
          indexRua={indexRua}
        />
      </section>
    </>
  );
}

const mapStateToProps = state => ( {
  municipio     : state.appConfig.usuario.municipio,
  quarteiroes   : state.quarteirao.quarteiroes,
  tableSelection: state.supportInfo.tableSelection,
  ruas:           state.rua.ruas
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    changeSidebar,
    getQuarteiroesMunicipioRequest,
    changeTableSelected,
    getStreetByCityRequest
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Ruas );
