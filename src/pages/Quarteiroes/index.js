/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDateBr } from '../../config/function';
import Table, { ButtonAdd, ButtonDesabled } from '../../components/Table';
import Typography from "@material-ui/core/Typography";
import ModalAdd from './ModalAdd';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import { ModalConfirm } from '../../components/Modal';
import $ from "jquery";

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getQuarteiroesMunicipioRequest } from '../../store/Quarteirao/quarteiraoActions';
import { changeTableSelected } from '../../store/SupportInfo/supportInfoActions';

// STYLES
import { GlobalStyle } from './styles';
import { PageIcon, PageHeader } from '../../styles/util';

//UTILIES FUNCTIONS
import { ordenadorDataHora } from '../../config/function';
import ModalDisabled from './ModalDisabled';

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
    name: "numero",
    label: "Quarteirão",
    options: {
      filter: false,
    },
  },
  "Cód. Localidade",
  "Localidade",
  "Zona",
  {
    name: "ativo",
    label: "Ativo",
    options: {
      filter: true,
      filterList: ["Sim"],
      customFilterListOptions: { render: (v) => `Ativo: ${v}` },
    },
  },
  {
    name:  "createdAt",
    label: "Criado em",
    options: {
      sortCompare: ordenadorDataHora
    }
  },
  {
    name:  "updatedAt",
    label: "Atualizado em",
    options: {
      sortCompare: ordenadorDataHora
    }
  },
];

const Quarteiroes = ({ quarteiroes, tableSelection, ...props }) => {
  const [ rows, setRows ] = useState([]);
  const [ rowsSelected, setRowsSelected ] = useState([]);
  const [ showModalAdd, setShowModalAdd] = useState(false)

  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          title="Adicionar"
          data-toggle="modal"
          data-target="#modal-novo-quarteirao"
          onClick={() => {setShowModalAdd(true)}} />
      );
    },
    customToolbarSelect: ({ data }) => {
      props.changeTableSelected( 'tableQuarteirao', data );
      return (
        <ButtonDesabled
          onClick={() => {
            $("#modal-desativar-quarteirao").modal("show");
          }}
          title="Desativar quarteirao"
          data-toggle="modal"
          data-target="#modal-desativar-quarteirao" />
      );
    },
   /*  onRowsSelect : ( curRowSelected, allRowsSelected ) => {
      setRowsSelected( allRowsSelected );
    }, */
    setRowProps: (row) => {
      const className = row[3] === "Não" ? "row-desabled" : "";

      return {
        className
      }
    },
    onRowClick: (row, ...props) => {
      const id = row[0].props['data-id'];

      window.location = `${ window.location.origin.toString() }/quarteiroes/${ id }`;
    }
  };

  useEffect(() => {
    props.changeSidebar( "quarteirao" );
    props.getQuarteiroesMunicipioRequest( props.municipio.id );
  }, []);

  useEffect(() => {
    createRows();
  }, [ quarteiroes ]);

  function createRows() {
    const list = quarteiroes.map( (quarteirao, index) => {
      return([
        { index: (index + 1), id: quarteirao.id },
        quarteirao.numero,
        quarteirao.localidade.codigo,
        quarteirao.localidade.nome,
        quarteirao.zona ? quarteirao.zona.nome : "",
        quarteirao.ativo ? "Sim" : "Não",
        getDateBr( quarteirao.createdAt ),
        getDateBr( quarteirao.updatedAt ),
      ])
    });

    setRows( list );
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><BorderAllIcon /></PageIcon>
          Quarteirões
        </h3>
      </PageHeader>
      <section className="card-list">
        <GlobalStyle />
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <Table
              title={`Quarteirões de ${ props.municipio.nome }`}
              columns={ columns }
              data={ rows }
              options={ options }
            />
          </article>
        </div>
        <ModalAdd
          show={showModalAdd}
          handleClose={() => { setShowModalAdd(false) } 
        }
        />
        <ModalDisabled/>
        {/* <ModalConfirm
          id="modal-desativar-quarteirao"
          title="Desativar"
          confirm={() => console.log( "desativar" ) }
        >
          <p>Deseja desativar o(s) quarteirão(ões)?</p>
        </ModalConfirm> */}
      </section>
    </>
  );
}

const mapStateToProps = state => ( {
  municipio     : state.appConfig.usuario.municipio,
  quarteiroes   : state.quarteirao.quarteiroes,
  tableSelection: state.supportInfo.tableSelection
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    changeSidebar,
    getQuarteiroesMunicipioRequest,
    changeTableSelected
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Quarteiroes );
