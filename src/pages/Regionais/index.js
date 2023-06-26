/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDateBr } from '../../config/function';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalAdd from './ModalAdd';
import ModalDisabled from './ModalDisabled';
import Table, { ButtonAdd, ButtonDesabled } from '../../components/Table';
import Typography from "@material-ui/core/Typography";
import { FaCity } from 'react-icons/fa';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { changeTableSelected } from '../../store/SupportInfo/supportInfoActions';
import { clearToast } from '../../store/AppConfig/appConfigActions';
import { changeCityEditIndex } from '../../store/Municipio/municipioActions';
import { getRegionalHealthByStateRequest } from '../../store/RegionalSaude/regionalSaudeActions';

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
      viewColumns: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Typography data-id={ value.id }>{ value.index }</Typography>
      ),
    }
  },
  {
    name: "nome",
    label: "Nome",
    options: {
      filter: false,
    }
  },
  {
    name: "endereco",
    label: "Endereco",
    options: {
      filter: false,
    }
  },
  "Ativo"
];

const Regionais = ( { regionaisSaude, coordGeral, ...props } ) => {
  const [ rows, setRows ]                    =  useState([]);
  const [ showModalAdd, setShowModalAdd ]    =  useState( false );


  const handleCloseModalAdd = () => {
    setShowModalAdd( false );
  }
  
  const options = {
    //Não permite que regionais inativas sejam selecionadas para serem inativadas novamente
    isRowSelectable: (dataIndex) => {
      return (rows[dataIndex][3] == "Sim")
    },

    customToolbar: () => {
      return (
        <ButtonAdd
          title="Adicionar"
          data-toggle="modal"
          data-target="#modal-nova-regional" 
          onClick={ () => { setShowModalAdd( true ); } }
        />
      );
    },
    customToolbarSelect: ( { data } ) => {
      props.changeTableSelected( 'tableRegionalHealth', data );
      return (
        <ButtonDesabled
          title="Desativar regional"
          data-toggle="modal"
          data-target="#modal-desativar-regional" 
        />
      );
    },
    setRowProps: ( row ) => {
      const className = row[ 5 ] === "Não" ? "row-desabled" : "";

      return {
        className
      }
    },
    onRowClick: ( row, ...props ) => {
      const id = row[ 0 ].props[ 'data-id' ];

      window.location = `${ window.location.origin.toString() }/regionais/${ id }`;
    }
  };

  useEffect(() => {
    props.changeSidebar( "regional" );
    props.getRegionalHealthByStateRequest( coordGeral.regionalSaude.estado.id );
  }, []);

  useEffect(() => {
    createRows();
  }, [ regionaisSaude ]);

  function createRows() {
    const regionaisList = regionaisSaude.map( (regional, index) => (
      [
        { index: (index + 1), id: regional.id },
        regional.nome,
        regional.endereco,
        regional.ativo ? "Sim" : "Não"
      ]
    ));

    setRows( regionaisList );
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
          Regionais de Saúde
        </h3>
      </PageHeader>
      <section className="card-list">
        <GlobalStyle />
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <Table
              title={ "Regionais de "+props.estado.nome}
              columns={ columns }
              data={ rows }
              options={ options }
            />
          </article>
        </div>
        <ModalAdd show={ showModalAdd } handleClose={ handleCloseModalAdd }/>
        <ModalDisabled/>

        <ToastContainer />
        { props.toast.message && notify() }
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  toast: state.appConfig.toast,
  regionaisSaude: state.regionalSaude.regionaisSaude,
  coordGeral: state.appConfig.usuario,
  estado: state.appConfig.usuario.regionalSaude.estado

});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    changeSidebar,
     clearToast, 
     changeCityEditIndex, 
     changeTableSelected,
     getRegionalHealthByStateRequest 
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Regionais);
