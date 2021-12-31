import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaChartPie, FaRegChartBar } from 'react-icons/fa';
import Table from '../../../components/Table';
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getByUserRequest } from '../../../store/TrabalhoDiario/trabalhoDiarioActions';

// STYLES
import { PageIcon, PageHeader } from '../../../styles/util';

const columns = [
  {
    name: "index",
    label: "#",
    options: {
      filter: false,
      display: 'false',
      customBodyRender: (value, tableMeta, updateValue) => (
        <Typography data-index={ value }>{ value }</Typography>
      )
    }
  },
  {
    name: "date",
    label: "Data",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "startTime",
    label: "Hora Ínicio",
    options: {
      filter: false,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "endTime",
    label: "Hora Fim",
    options: {
      filter: false,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "supervisor",
    label: "Supervisor",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "methodology",
    label: "Metodologia",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "objective",
    label: "Objetivo",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "cycle",
    label: "Ciclo",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "actions",
    label: "Ações",
    options: {
      filter: false,
      align: "center",
      disablePadding: false
    }
  }
];
function Agent_DailyReport({ user, dailyJobs, ...props }) {
  const [ rows, setRows ] = useState([]);

  useEffect(() => {
    props.changeSidebar(3, 2);
    props.getByUserRequest( user.id );
  }, []);

  useEffect(() => {
    createRows( dailyJobs );
  }, [ dailyJobs ]);

  function createRows( dailyJobs ) {
    const jobs = dailyJobs.map(( job, index ) => {
      const [ Y, m, d ] = job.data.split( 'T' )[ 0 ].split( '-' );
      const cycle       = `${ job.equipe.atividade.ciclo.ano }.${ job.equipe.atividade.ciclo.sequencia }`;

      return (
        [
          { index: ( index + 1 ), id: job.id },
          `${ d }/${ m }/${ Y }`,
          job.horaInicio,
          job.horaFim,
          job.supervisor.nome,
          job.equipe.atividade.metodologia.sigla,
          job.equipe.atividade.objetivo.sigla,
          cycle,
          <Tooltip className="text-info" title="Relatórios" onClick={ () => openReport( job.id ) } >
            <IconButton aria-label="desativar">
              <FaRegChartBar />
            </IconButton>
          </Tooltip>
        ]
      )
    });

    setRows( jobs );
  }

  function openReport( dailyJob_id ) {
    window.location = `${ window.location.origin.toString() }/relatorio/boletimDiario/${ dailyJob_id }`;
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartPie /></PageIcon>
          Boletins Diário
        </h3>
      </PageHeader>

      <section className="card-list">
        <Row>
          <Col className="pt-40">
            <Table
              title="Boletins"
              columns={ columns }
              data={ rows } 
            />
          </Col>
        </Row>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  user: state.appConfig.usuario,
  dailyJobs: state.trabalhoDiario.trabalhosDiario
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getByUserRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Agent_DailyReport );
