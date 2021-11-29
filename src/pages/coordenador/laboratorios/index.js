/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table, { ButtonAdd, ButtonDesabled } from '../../../components/Table';
import ModalAdd from './ModalAdd';
import ModalDisabled from './ModalDisabled';
import ModalUpdate from './ModalUpdate';
import { FaVials, FaPenSquare } from 'react-icons/fa';
import { Tooltip, IconButton } from '@material-ui/core';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebar';
import { changeTableSelected } from '../../../store/actions/supportInfo';
import { clearToast } from '../../../store/actions/appConfig';
import { getLaboratoriosRequest, updateLaboratoryRequest } from '../../../store/Laboratorio/laboratorioActions'; 

// STYLES
import { GlobalStyle } from './styles';
import { PageHeader, PageIcon} from '../../../styles/util';

const columns = [
  {
    label: "CNPJ",
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
    label: "Endereço",
    options: {
      filter: false
    }
  },
  {
    label: "Tipo",
    options: {
      filter: false
    }
  },
  {
    label: "Criado em",
    options: {
      filter: false
    }
  },
  {
    label: "Alterado em",
    options: {
      filter: false
    }
  },
  {
    label: "Ações",
    options: {
      filter: false
    }
  }
];

function Laboratorios({ municipio_id, localidades, laboratorios, municipio, ...props }) {
  const [ rows, setRows ] = useState([]);
  const [cnpj_up, setCnpj] = useState([]);
  const [nome_up, setNome] = useState([]);
  const [tipo_up, setTipo] = useState([]);
  const [endereco_up, setEndereco] = useState([]);
  const [created_at, setCreated_at] = useState([]);
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
          title="Desabilidade Laboratorio"
          toggle="modal"
          target="#modal-desativar-laboratorio" />
      );
    },
    setRowProps: (row) => {
      const className = row[8] === "Não" ? "row-desabled" : "";

      return {
        className
      }
    },
  };

  useEffect(() => {
    props.changeSidebar(5, 0);
    props.getLaboratoriosRequest(municipio_id);
  }, []);

  useEffect(() => {
    createRows();
  }, [ laboratorios ]);

  useEffect(() => {
    createRows();
  }, [ props.reload ]);

  function createRows() { 
    const list = laboratorios.map((lab, index) => {
      console.log(laboratorios)
      return([
        lab.cnpj,
        lab.nome,
        lab.endereco,
        capitalize(lab.tipo_laboratorio),
        getFormattedDate(lab.created_at),
        getFormattedDate(lab.updated_at),
        <Tooltip
            className="bg-warning text-white"
            title="Editar"
            data-togle="modal"
            data-target="modal-update-laboratorio"
            onClick={ () => handlerLaboratorio( laboratorios[index].cnpj,  laboratorios[index].nome,  laboratorios[index].endereco,  laboratorios[index].tipo_laboratorio, laboratorios[index].created_at, municipio_id)}
          >
            <IconButton aria-label="Editar">
              <FaPenSquare />
            </IconButton>
          </Tooltip>
      ])
    })
    
    setRows( list );
  };

  const handlerLaboratorio = (cnpj, nome, endereco, tipo, created_at, municipio_id) => {
    setCnpj(cnpj)
    setNome(nome)
    setEndereco(endereco)
    setTipo(capitalize(tipo))
    setCreated_at(created_at)
    $( '#modal-update-laboratorio' ).modal( 'show' );
  };

  function notify() {
    toast(props.toast.message, {
      type: props.toast.type,
      onClose: props.clearToast()
    });
  }

  function getFormattedDate(str) {
    var date = new Date(str);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var formatterDay;	
    if (day < 10) {
        formatterDay = '0'+ day;
    } else {
        formatterDay = day;
    }	
    var formatterMonth;	
    if (month < 10) {
        formatterMonth = '0'+ month;
    } else {
        formatterMonth = month;
    }
    return formatterDay +'/'+ formatterMonth +'/'+ year;
}

  function capitalize(str){
    str = str.toString()
    return str[0].toUpperCase()+str.slice(1)
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaVials /></PageIcon>
          Laboratórios
        </h3>
      </PageHeader>
      <section className="card-list">
        <GlobalStyle />
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <Table
              title={ `Laboratórios de ${ municipio.nome }` }
              columns={ columns }
              data={ rows }
              options={ options }
              turnRed={ "ativo" } />
          </article>
        </div>
        <ModalUpdate cnpj_rec = {cnpj_up} nome_rec = {nome_up} categoria_rec = {tipo_up} endereco_rec = {endereco_up} created_at = {created_at}/>
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
  laboratorios: state.nw_laboratorio.laboratorios,
  reload: state.localidade.reload,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    changeTableSelected,
    clearToast,
    getLaboratoriosRequest,
    updateLaboratoryRequest,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Laboratorios);
