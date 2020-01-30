/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDateBr } from '../../config/function';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalAdd from './ModalAdd';
import ModalUpdate from './ModalUpdate';
import ModalDisabled from './ModalDisabled';
import Table, { ButtonEdit, ButtonAdd, ButtonDesabled } from '../../components/Table';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/actions/sidebar';
import { clearToast } from '../../store/actions/appConfig';
import { getMunicipiosRequest, changeCityEditIndex } from '../../store/actions/MunicipioActions';

const columns = [
  "#",
  "Código",
  "Nome",
  "Criado em",
  "Atualizado em",
  {
    name: "Ação",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const { index, idModal, changeIndex } = value;

        return (
          <ButtonEdit index={ index } idModal={ idModal } changeIndex={ changeIndex } />
        );
      }
    }
  }
];

function Municipios({ municipios, ...props }) {
  const [ rows, setRows ] = useState([]);

  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          toggle="modal"
          target="#modal-novo-municipio" />
      );
    },
    customToolbarSelect: () => {
      return (
        <ButtonDesabled
          toggle="modal"
          target="#modal-desativar-municipio" />
      );
    }
  };

  useEffect(() => {
    props.changeSidebar(5, 0);
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
        (index + 1),
        municipio.codigo,
        municipio.nome,
        getDateBr( municipio.createdAt ),
        getDateBr( municipio.updatedAt ),
        { index, idModal: 'modal-update-city', changeIndex: props.changeCityEditIndex }
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
    <section className="card-list">
      <div className="row">

        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <Table
              title="Municípios"
              columns={ columns }
              data={ rows }
              options={ options } />
          </div>
        </article>
      </div>
      <ModalAdd />
      <ModalUpdate />
      <ModalDisabled />

      <ToastContainer />
      { props.toast.message && notify() }
    </section>
  );
}

const mapStateToProps = state => ({
  municipios: state.municipio.municipios,
  reload: state.municipio.reload,
  updatedCity: state.municipio.updatedCity,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getMunicipiosRequest, clearToast, changeCityEditIndex }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Municipios);
