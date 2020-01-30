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

function Zonas({ municipios, ...props }) {

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
          </div>
        </article>
      </div>

      <ToastContainer />
      { props.toast.message && notify() }
    </section>
  );
}

const mapStateToProps = state => ({
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Zonas);
