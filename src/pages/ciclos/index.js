/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import 'react-toastify/dist/ReactToastify.css';
import Table, { ButtonAdd, ButtonDesabled } from '../../components/Table';
import { FaSyncAlt, FaRegChartBar } from 'react-icons/fa';
import ModalDestroy from './ModalDestroy';
import ModalUpdateCycle from './ModalUpdateCycle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { changeTableSelected } from '../../store/SupportInfo/supportInfoActions';
import { getCyclesRequest, setIndexArray } from '../../store/Ciclo/cicloActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// STYLES
import { GlobalStyle } from './styles';
import { PageIcon, PageHeader } from '../../styles/util';

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
  "Situação",
  "Ações"
];

function Ciclos({ ciclos, regionalSaude_id, ...props }) {
  const [ rows, setRows ] = useState([]);
  const options = {
    customToolbar: props => {
      return (
        <ButtonAdd
          title="Adicionar"
          onClick={
            () => window.location = `${ window.location.origin.toString() }/ciclos/cadastrar`
          }
        />
      );
    },
    customToolbarSelect: ({ data }) => {
      props.changeTableSelected('tableCycle', data);
      return (
        <ButtonDesabled
          title="Excluir ciclo"
          toggle="modal"
          target="#modal-excluir-ciclo"
          data={ data } />
      );
    },
    onRowClick: (row, index, ...args) => {
      const situacao = row[4];

      if( situacao === "Finalizado" )
        props.showNotifyToast( "Não é permitido editar ciclos finalizados", "warning" );
      else {
        props.setIndexArray( index.dataIndex );
        $('#modal-editar-ciclo').modal('show');
      }
    }
  };

  useEffect(() => {
    props.changeSidebar( "ciclo", "ci_consultar" );
    props.getCyclesRequest( regionalSaude_id );
  }, []);

  useEffect(() => {
    createRows();
  }, [ ciclos, props.reload ]);

  function createRows() {
    let current_date = new Date();
    current_date.setHours(0,0,0,0);

    const cycles = ciclos.map( (ciclo, index) => {
      let [ ano, mes, dia ] = ciclo.dataInicio.split('-');
      const dataInicioBr = `${ dia }/${ mes }/${ ano }`;
      let dataInicio = new Date( ano, mes - 1, dia, 0, 0, 0, 0 );

      [ ano, mes, dia ] = ciclo.dataFim.split('-');
      const dataFimBr = `${ dia }/${ mes }/${ ano }`;
      let dataFim = new Date( ano, mes - 1, dia, 0, 0, 0, 0 );

      if( dataInicio <= current_date && dataFim >= current_date )
        ciclo.situacao = "Em aberto";
      else if( dataFim < current_date )
        ciclo.situacao = "Finalizado";
      else
        ciclo.situacao = "Planejado";

      return (
        [
          { index: (index + 1), id: ciclo.id },
          `${ ciclo.ano }.${ ciclo.sequencia }`,
          dataInicioBr,
          dataFimBr,
          ciclo.situacao,
          <Tooltip className="text-info" title="Relatórios" >
            <IconButton aria-label="desativar">
              <FaRegChartBar />
            </IconButton>
          </Tooltip>
        ]
      )
    });

    setRows( cycles );
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaSyncAlt /></PageIcon>
          Ciclos
        </h3>
      </PageHeader>
      <section className="card-list">
        <GlobalStyle />
        <div className="row">
          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <Table
              title="Ciclos"
              columns={ columns }
              data={ rows }
              options={ options }
            />

            <ModalUpdateCycle />
            <ModalDestroy />
          </article>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  regionalSaude_id: state.appConfig.usuario.regionalSaude.id,
  ciclos: state.ciclo.ciclos,
  reload: state.ciclo.reload,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    changeTableSelected,
    getCyclesRequest,
    showNotifyToast,
    setIndexArray
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ciclos);
