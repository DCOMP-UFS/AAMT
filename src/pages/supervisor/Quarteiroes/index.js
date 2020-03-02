/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDateBr } from '../../../config/function';
import Table, { ButtonAdd, ButtonDesabled } from '../../../components/Table';
import Typography from "@material-ui/core/Typography";
import ModalAdd from './ModalAdd';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarSupervisor';
import { changeTableSelected } from '../../../store/actions/supportInfo';
import { getBlockByCityRequest } from '../../../store/actions/QuarteiraoActions';

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
  "Número",
  "Zona",
  "Ativo",
  "Criado em",
  "Atualizado em"
];

function Quarteiroes({ quarteiroes, ...props }) {
  const [ rows, setRows ] = useState([]);
  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          toggle="modal"
          target="#modal-novo-quarteirao" />
      );
    },
    customToolbarSelect: ({ data }) => {
      props.changeTableSelected('tableCity', data);
      return (
        <ButtonDesabled
          toggle="modal"
          target="#modal-desativar-quarteirao" />
      );
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
    props.changeSidebar(1, 1);
    props.getBlockByCityRequest( props.municipio.id );
  }, []);

  useEffect(() => {
    createRows();
  }, [ quarteiroes ]);

  function createRows() {
    const list = quarteiroes.map( (quarteirao, index) => (
      [
        { index: (index + 1), id: quarteirao.id },
        quarteirao.numero,
        quarteirao.zona.nome,
        quarteirao.ativo ? "Sim" : "Não",
        getDateBr( quarteirao.createdAt ),
        getDateBr( quarteirao.updatedAt ),
      ]
    ));

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
              title={`Quarteirões de ${ props.municipio.nome }`}
              columns={ columns }
              data={ rows }
              options={ options } />
          </div>
        </article>
      </div>
      <ModalAdd />
    </section>
  );
}

const mapStateToProps = state => ({
  municipio: state.appConfig.usuario.municipio,
  quarteiroes: state.quarteirao.quarteiroes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getBlockByCityRequest, changeTableSelected }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quarteiroes);
