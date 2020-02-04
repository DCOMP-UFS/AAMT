/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDateBr } from '../../config/function';
import Table, { ButtonAdd, ButtonDesabled } from '../../components/Table';
import Typography from "@material-ui/core/Typography";
import ModalAdd from "./ModalAdd";
import ModalDisabled from "./ModalDisabled";

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/actions/sidebar';
import { changeTableSelected } from '../../store/actions/supportInfo';
import { getZoneByCityRequest } from '../../store/actions/ZonaActions';

// STYLES
import { GlobalStyle } from './styles';

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
    label: "Nome",
    options: {
      filter: false
    }
  },
  {
    name: "createdAt",
    label: "Criado em",
    options: {
     display: 'false',
     filter: false
    }
  },
  {
    name: "updatedAt",
    label: "Atualizado em",
    options: {
     display: 'false',
     filter: false
    }
  },
  "Município",
  "Localidade",
  "Ativo"
];

function Zonas({ zonas, municipio_id, ...props }) {
  const [ rows, setRows ] = useState([]);

  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          toggle="modal"
          target="#modal-novo-zona" />
      );
    },
    customToolbarSelect: ({ data }) => {
      props.changeTableSelected('tableZone', data);
      return (
        <ButtonDesabled
          title="Deletar zona(s)"
          toggle="modal"
          target="#modal-desativar-zona" />
      );
    },
    setRowProps: (row) => {
      const className = row[8] === "Não" ? "row-desabled" : "";

      return {
        className
      }
    },
    onRowClick: (row, ...props) => {
      const id = row[0].props['data-id'];

      window.location = `${ window.location.origin.toString() }/zonas/${ id }`;
    }
  };

  useEffect(() => {
    props.changeSidebar(6, 1);
    props.getZoneByCityRequest( municipio_id );
  }, []);

  useEffect(() => {
    createRows();
  }, [ zonas, props.reload ]);

  function createRows() {
    const list = zonas.map( (z, index) => {
      const localidade = z.localidade ? z.localidade.nome : "";

      return ([
        { index: (index + 1), id: z.id },
        z.nome === 'unica' ? "Única" : z.nome,
        getDateBr( z.createdAt ),
        getDateBr( z.updatedAt ),
        z.municipio.nome,
        localidade,
        z.ativo ? "Sim" : "Não"
      ])
    });

    setRows( list );
  }

  return (
    <section className="card-list">
      <GlobalStyle />
      <div className="row">
        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <Table
              title="Zona(s)"
              columns={ columns }
              data={ rows }
              options={ options }
              turnRed={ "ativo" } />
          </div>
        </article>
      </div>

      <ModalAdd />
      <ModalDisabled />
    </section>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.usuario.usuario.municipio.id,
  reload: state.zona.reload,
  zonas: state.zona.zonas
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getZoneByCityRequest, changeTableSelected }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Zonas);
