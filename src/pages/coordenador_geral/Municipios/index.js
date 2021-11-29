/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDateBr } from '../../../config/function';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalAdd from './ModalAdd';
import ModalUpdate from './ModalUpdate';
import ModalDisabled from './ModalDisabled';
import Table, { ButtonAdd, ButtonDesabled } from '../../../components/Table';
import Typography from "@material-ui/core/Typography";
import { FaCity } from 'react-icons/fa';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarCoordGeral';
import { changeTableSelected } from '../../../store/actions/supportInfo';
import { clearToast } from '../../../store/AppConfig/appConfigActions';
import { getMunicipiosRequest, changeCityEditIndex } from '../../../store/actions/MunicipioActions';

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
  "Código",
  "Nome",
  "Criado em",
  "Atualizado em",
  "Ativo"
];

function Municipios({ municipios, ...props }) {
  const [ rows, setRows ] = useState([]);
  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          title="Adicionar"
          data-toggle="modal"
          data-target="#modal-novo-municipio" />
      );
    },
    customToolbarSelect: ({ data }) => {
      props.changeTableSelected('tableCity', data);
      return (
        <ButtonDesabled
          title="Desativar município"
          data-toggle="modal"
          data-target="#modal-desativar-municipio" />
      );
    },
    setRowProps: (row) => {
      const className = row[5] === "Não" ? "row-desabled" : "";

      return {
        className
      }
    },
    onRowClick: (row, ...props) => {
      const id = row[0].props['data-id'];

      window.location = `${ window.location.origin.toString() }/cg/municipios/${ id }`;
    }
  };

  useEffect(() => {
    props.changeSidebar(4, 0);
    props.getMunicipiosRequest();
  }, []);

  useEffect(() => {
    createRows();
  }, [ municipios ]);

  useEffect(() => {
    createRows();
  }, [ props.reload ]);

  function createRows() {
    const municipiosList = municipios.map( (municipio, index) => (
      [
        { index: (index + 1), id: municipio.id },
        municipio.codigo,
        municipio.nome,
        getDateBr( municipio.createdAt ),
        getDateBr( municipio.updatedAt ),
        municipio.ativo ? "Sim" : "Não"
      ]
    ));

    setRows( municipiosList );
  }

  function notify() {
    toast(props.toast.message, {
      type: props.toast.type,
      onClose: props.clearToast()
    });
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaCity /></PageIcon>
          Municípios
        </h3>
      </PageHeader>
      <section className="card-list">
        <GlobalStyle />
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <Table
              title="Municípios"
              columns={ columns }
              data={ rows }
              options={ options }
            />
          </article>
        </div>
        <ModalAdd />
        <ModalUpdate />
        <ModalDisabled />

        <ToastContainer />
        { props.toast.message && notify() }
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  municipios: state.municipio.municipios,
  reload: state.municipio.reload,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getMunicipiosRequest, clearToast, changeCityEditIndex, changeTableSelected }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Municipios);
