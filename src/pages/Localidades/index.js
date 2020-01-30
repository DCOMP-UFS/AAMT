/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDateBr } from '../../config/function';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table, { ButtonEdit, ButtonAdd, ButtonDesabled } from '../../components/Table';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/actions/sidebar';
import { changeTableSelected } from '../../store/actions/supportInfo';
import { clearToast } from '../../store/actions/appConfig';
import { getLocationRequest, changeIndex } from '../../store/actions/LocalidadeActions';

const columns = [
  "#",
  "Código",
  "Nome",
  "Criado em",
  "Atualizado em",
  "Ativo",
  "Categoria",
  "Cód. Município",
  "Município",
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

function Localidades({ localidades, ...props }) {
  const [ rows, setRows ] = useState([]);
  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          toggle="modal"
          target="#modal-novo-localidade" />
      );
    },
    customToolbarSelect: ({ data }) => {
      props.changeTableSelected('tableLocation', data);
      return (
        <ButtonDesabled
          toggle="modal"
          target="#modal-desativar-localidade" />
      );
    }
  };

  useEffect(() => {
    props.changeSidebar(7, 0);
    // props.getMunicipiosRequest();
  }, []);

  useEffect(() => {
    createRows();
  }, [ localidades ]);

  useEffect(() => {
    createRows();
  }, [ props.reload ]);

  function createRows() {
    const list = localidades.map( (l, index) => (
      [
        (index + 1),
        l.codigo,
        l.nome,
        getDateBr( l.createdAt ),
        getDateBr( l.updatedAt ),
        l.ativo,
        l.categoria.nome,
        l.municipio.codigo,
        l.municipio.nome,
        { index, idModal: 'modal-update-city', changeIndex: props.changeCityEditIndex }
      ]
    ));

    setRows( list );
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

      <ToastContainer />
      { props.toast.message && notify() }
    </section>
  );
}

const mapStateToProps = state => ({
  localidades: state.localidade.localidades,
  reload: state.localidade.reload,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, changeTableSelected, clearToast, getLocationRequest, changeIndex }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Localidades);
