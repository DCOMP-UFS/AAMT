/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDateBr } from '../../../config/function';
import Table, { ButtonAdd, ButtonDesabled } from '../../../components/Table';
import Typography from "@material-ui/core/Typography";
import ModalAdd from './ModalAdd';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import { ModalConfirm } from '../../../components/Modal';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarSupervisor';
import { getBlockByCityRequest } from '../../../store/actions/QuarteiraoActions';

// STYLES
import { GlobalStyle } from './styles';
import { PageIcon, PageHeader } from '../../../styles/util';

const columns = [
  {
    name: "index",
    label: "#",
    options: {
      filter: false,
      display: 'false',
      customBodyRender: (value, tableMeta, updateValue) => (
        <Typography data-id={ value.id }>{ value.index }</Typography>
      )
    }
  },
  {
    name: "numero",
    label: "Quarteirão",
    options: {
      filter: false,
    }
  },
  "Cód. Localidade",
  "Localidade",
  "Zona",
  "Ativo",
  {
    name: "createdAt",
    label: "Criado em",
    options: {
      filter: false,
    }
  },
  {
    name: "updatedAt",
    label: "Atualizado em",
    options: {
      filter: false,
    }
  }
];

function Quarteiroes({ quarteiroes, tableSelection, ...props }) {
  const [ rows, setRows ] = useState([]);
  const [ rowsSelected, setRowsSelected ] = useState([]);
  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          title="Adicionar"
          data-toggle="modal"
          data-target="#modal-novo-quarteirao" />
      );
    },
    customToolbarSelect: ({ data }) => {
      // setRowsSelected( data );
      return (
        <ButtonDesabled
          title="Desativar"
          data-toggle="modal"
          data-target="#modal-desativar-quarteirao" />
      );
    },
    onRowsSelect : ( curRowSelected, allRowsSelected ) => {
      setRowsSelected( allRowsSelected );
    },
    setRowProps: (row) => {
      const className = row[3] === "Não" ? "row-desabled" : "";

      return {
        className
      }
    },
    onRowClick: (row, ...props) => {
      const id = row[0].props['data-id'];

      window.location = `${ window.location.origin.toString() }/sup/quarteiroes/${ id }`;
    }
  };

  useEffect(() => {
    props.changeSidebar( 1, 1 );
    props.getBlockByCityRequest( props.municipio.id );
  }, []);

  useEffect(() => {
    createRows();
  }, [ quarteiroes ]);

  useEffect(() => {
    const quarteiroesSelect = rowsSelected.map( r => ( rows[ r.dataIndex ] ));
  }, [ rowsSelected ]);

  function createRows() {
    const list = quarteiroes.map( (quarteirao, index) => (
      [
        { index: (index + 1), id: quarteirao.id },
        quarteirao.numero,
        quarteirao.localidade.codigo,
        quarteirao.localidade.nome,
        quarteirao.zona ? quarteirao.zona.nome : "",
        quarteirao.ativo ? "Sim" : "Não",
        getDateBr( quarteirao.createdAt ),
        getDateBr( quarteirao.updatedAt ),
      ]
    ));

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
        <ModalAdd />
        <ModalConfirm
          id="modal-desativar-quarteirao"
          title="Desativar"
          confirm={() => console.log( "desativar" ) }
        >
          <p>Deseja desativar o(s) quarteirão(ões)?</p>
        </ModalConfirm>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  municipio: state.appConfig.usuario.municipio,
  quarteiroes: state.quarteirao.quarteiroes,
  tableSelection: state.supportInfo.tableSelection
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getBlockByCityRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quarteiroes);
