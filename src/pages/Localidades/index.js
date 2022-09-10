/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDateBr } from '../../config/function';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from "@material-ui/core/Typography";
import Table, { ButtonAdd, ButtonDesabled } from '../../components/Table';
import ModalAdd from './ModalAdd';
import ModalDisabled from './ModalDisabled';
import { FaMapSigns } from 'react-icons/fa';
import $ from "jquery";

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { changeTableSelected } from '../../store/SupportInfo/supportInfoActions';
import { clearToast } from '../../store/AppConfig/appConfigActions';
import { getLocationRequest, getLocationByCityRequest, changeIndex } from '../../store/Localidade/localidadeActions';

// STYLES
import { GlobalStyle } from './styles';
import { PageHeader, PageIcon } from '../../styles/util';

import { ordenadorDataHora } from '../../config/function';

const columns = [
  {
    name: "index",
    label: "#",
    options: {
      filter: false,
      display: 'false',
      viewColumns: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Typography data-id={ value.id }>{ value.index }</Typography>
        );
      }
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
     filter: false,
     sortCompare: ordenadorDataHora
    }
  },
  {
    name: "updatedAt",
    label: "Atualizado em",
    options: {
     display: 'false',
     filter: false,
     sortCompare: ordenadorDataHora
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

const Localidades = ({ municipio_id, localidades, municipio, ...props }) => {
  const [ rows, setRows ] = useState([]);
  
  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          title="Adicionar"
          data-toggle="modal"
          data-target="#modal-novo-localidade" />
      );
    },
    customToolbarSelect: ({ data }) => {
      props.changeTableSelected('tableLocation', data);
      return (
        <ButtonDesabled
          onClick={() => {
            $("#modal-desativar-localidade").modal("show");
          }}
          title="Desabilidade bairro/localidade"
          toggle="modal"
          target="#modal-desativar-localidade"
        />
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

      window.location = `${ window.location.origin.toString() }/localidades/${ id }`;
    }
  };

  useEffect(() => {
    props.changeSidebar( "localidade" );
    // props.getLocationRequest();
    props.getLocationByCityRequest( municipio_id );
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
        { index: (index + 1), id: l.id },
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
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaMapSigns /></PageIcon>
          Localidade/Bairro
        </h3>
      </PageHeader>
      <section className="card-list">
        <GlobalStyle />
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <Table
              title={ `Bairro(s)/Localidade(s) de ${ municipio.nome }` }
              columns={ columns }
              data={ rows }
              options={ options }
              turnRed={ "ativo" } />
          </article>
        </div>
        <ModalAdd />
        <ModalDisabled />

        <ToastContainer />
        { props.toast.message && notify() }
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  municipio: state.appConfig.usuario.municipio,
  localidades: state.localidade.localidades,
  reload: state.localidade.reload,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    changeTableSelected,
    clearToast,
    getLocationRequest,
    getLocationByCityRequest,
    changeIndex
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Localidades);
