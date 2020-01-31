/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDateBr } from '../../config/function';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import Table, { ButtonAdd, ButtonDesabled } from '../../components/Table';
import ModalAdd from './ModalAdd';
import ModalDisabled from './ModalDisabled';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/actions/sidebar';
import { changeTableSelected } from '../../store/actions/supportInfo';
import { clearToast } from '../../store/actions/appConfig';
import { getLocationRequest, changeIndex } from '../../store/actions/LocalidadeActions';

import { Color } from '../../styles/global';

const columns = [
  {
    name: "index",
    label: "#",
    options: {
      filter: false,
      display: 'false'
    }
  },
  {
    label: "Código",
    options: {
      filter: false
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
  {
    name: "Categoria",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        let bg_mark = "info";

        if( value === "Rural" )
          bg_mark = "success";

        if( value === "Terra indígena" )
          bg_mark = "primary";

        return (
          <mark className={`bg-${ bg_mark } text-white`}>{ value }</mark>
        );
      }
    }
  },
  "Cód. Município",
  "Município",
  "Ativo",
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
    },
    setRowProps: (row) => {
      const className = row[8] === "Não" ? "row-desabled" : "";

      return {
        className
      }
    },
    onRowClick: (row, ...props) => {
      // row[0] === index + 1

      window.location = `${ window.location.origin.toString() }/localidades/${ row[0] }`;
    }
  };

  useEffect(() => {
    props.changeSidebar(7, 0);
    props.getLocationRequest();
  }, []);

  useEffect(() => {
    createRows();
  }, [ localidades ]);

  useEffect(() => {
    createRows();
  }, [ props.reload ]);

  function createRows() {
    const list = localidades.map( (l, index) => {
      return ([
        (index + 1),
        l.codigo,
        l.nome,
        getDateBr( l.createdAt ),
        getDateBr( l.updatedAt ),
        l.categoria.nome,
        l.municipio.codigo,
        l.municipio.nome,
        l.ativo ? "Sim" : "Não",
      ])
    });

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
              title="Bairro(s)/Localidade(s)"
              columns={ columns }
              data={ rows }
              options={ options }
              turnRed={ "ativo" } />
          </div>
        </article>
      </div>
      <ModalAdd />
      <ModalDisabled />

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
