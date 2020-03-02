/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import 'react-toastify/dist/ReactToastify.css';
import Table, { ButtonAdd, ButtonDesabled } from '../../../components/Table';


// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarCoordGeral';
import { changeTableSelected } from '../../../store/actions/supportInfo';
import { getCyclesRequest } from '../../../store/actions/CicloActions';

// STYLES
// import { GlobalStyle } from './styles';

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
    name: "ciclo",
    label: "Ciclo",
    options: {
      filter: false,
      sortDirection: 'asc'
    }
  },
  {
    name: "dataInicio",
    label: "Data de Início",
    options: {
      filter: false,
    }
  },
  {
    name: "dataFim",
    label: "Data Fim",
    options: {
      filter: false,
    }
  },
  "Situação"
];

function Ciclos({ ciclos, regionalSaude_id, usuarios, ...props }) {
  const [ rows, setRows ] = useState([]);
  const options = {
    customToolbar: props => {
      return (
        <ButtonAdd
          handleClick={
            () => window.location = `${ window.location.origin.toString() }/cg/ciclos/cadastrar`
          }
        />
      );
    },
    customToolbarSelect: ({ data }) => {
      props.changeTableSelected('tableUser', data);
      return (
        <ButtonDesabled
          title="Excluir ciclo"
          toggle="modal"
          target="#modal-excluir-ciclo"
          data={ data } />
      );
    },
    onRowClick: (row, ...props) => {
      const id = row[0].props['data-id'];

      window.location = `${ window.location.origin.toString() }/cg/ciclos/${ id }`;
    }
  };

  useEffect(() => {
    props.changeSidebar(1, 2);
    props.getCyclesRequest( regionalSaude_id );
  }, []);

  useEffect(() => {
    createRows();
  }, [ ciclos, props.reload ]);

  function createRows() {
    const cycles = ciclos.map( (ciclo, index) => {
      let [ ano, mes, dia ] = ciclo.dataInicio.split('T')[0].split('-');
      const dataInicio = `${ dia }/${ mes }/${ ano }`;
      [ ano, mes, dia ] = ciclo.dataFim.split('T')[0].split('-');
      const dataFim = `${ dia }/${ mes }/${ ano }`;

      return (
        [
          { index: (index + 1), id: ciclo.id },
          `${ ciclo.ano }.${ ciclo.sequencia }`,
          dataInicio,
          dataFim,
          ciclo.situacao
        ]
      )
    });

    setRows( cycles );
  }

  return (
      <section className="card-list">
        <div className="row">
          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <Table
                title="Ciclos"
                columns={ columns }
                data={ rows }
                options={ options } />
            </div>
          </article>
        </div>
      </section>
  );
}

const mapStateToProps = state => ({
  regionalSaude_id: state.appConfig.usuario.regionalSaude.id,
  ciclos: state.ciclo.ciclos,
  usuarios: state.usuario.usuarios,
  reload: state.usuario.reload,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    changeTableSelected,
    getCyclesRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ciclos);
