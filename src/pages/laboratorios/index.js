/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Table, { ButtonAdd, ButtonDesabled } from '../../components/Table';
import ModalAdd from './ModalAdd';
import ModalDisabled from './ModalDisabled';
import ModalUpdate from './ModalUpdate';
import { FaVials, FaPenSquare } from 'react-icons/fa';
import { Tooltip, IconButton } from '@material-ui/core';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { changeTableSelected } from '../../store/SupportInfo/supportInfoActions';
import { getLaboratoriosRequest, updateLaboratoryRequest } from '../../store/Laboratorio/laboratorioActions'; 

// MODELS
import { Laboratorio } from '../../config/models';

// STYLES
import { GlobalStyle } from './styles';
import { PageHeader, PageIcon} from '../../styles/util';

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

    }
  },
  {
    label: "Ativo",
    id: 'ativo',
    options: {
      filter: true,
      filterList: ['Sim'],
      customFilterListOptions: { render: v => `Ativo: ${v}` },
    },
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

const Laboratorios = ( { municipio_id, localidades, laboratorios, municipio, ...props } ) => {
  const [ rows, setRows ]                           = useState( [] );
  const [ showModalAdd, setShowModalAdd ]           = useState( false );
  const [ showModalEditar, setShowModalEditar ]     = useState( false );
  const [ showModalDisabled, setShowModalDisabled ] = useState( false );
  const [ laboratorio, setLaboratorio ]             = useState( new Laboratorio );
  const [ id , setId ]                      = useState( null );
  const options                                     = {
    customToolbar: () => {
      return (
        <ButtonAdd
          title="Adicionar"
          onClick={ () => { setShowModalAdd( true ); } }
        />
      );
    },
    customToolbarSelect: ( { data } ) => {
      props.changeTableSelected( 'tableLocation', data );
      return (
        <ButtonDesabled
          onClick = { () => { setShowModalDisabled( true ); } }
          title="Desabilidade Laboratorio"
          data-toggle="modal"
          data-target="#modal-desativar-laboratorio" />
      );
    },
    setRowProps: row => {
      const className = row[ 8 ] === "Não" ? "row-desabled" : "";

      return {
        className
      }
    },
  };

  /**
   * Effect acionado assim que o componente é construido.
   * Esta função solicita a consulta da lista de laboratórios do usuário logado
   */
  useEffect( () => {
    props.changeSidebar( "laboratorio" );
    props.getLaboratoriosRequest( municipio_id );
  }, [] );

  /**
   * Após a consulta dos laboratórios o state laboratorios é preenchido.
   * Este effect monitora o state e aciona a função de criar linhas da tabela
   * com os laboratórios consultados.
   */
  useEffect( () => {
    createRows();
  }, [ laboratorios, props.reload ] );

  /**
   * Esta função cria as linahs da tabela e armazena na variável rows.
   * @returns void
   */
  const createRows = () => {
    const list = laboratorios.map( ( lab ) => {
      return( [
        fill0(lab.cnpj.toString()).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"),
        lab.nome,
        lab.endereco,
        capitalize( lab.tipoLaboratorio ),
        lab.ativo ? "Sim" : "Não",
        getFormattedDate( lab.createdAt ),
        getFormattedDate( lab.updatedAt ),
        <Tooltip
          className   ="bg-warning text-white"
          title       ="Editar"
          onClick     ={ () => { setLaboratorio( lab ); setShowModalEditar( true ); setId( lab.id ); } }
        >
          <IconButton aria-label="Editar">
            <FaPenSquare />
          </IconButton>
        </Tooltip>
      ] );
    } );

    setRows( list );
  };
  /**
   * Preenche o CNPJ com zeros a esquerda
   * @param {string} str 
   * @returns {string}
   */

  const fill0 = str =>{
    while (str.length < 14){
      str = '0' + str;
    };
    return str; 
  }
  /**
   * Formata uma string data no padrão PT-BR
   * @param {string} str 
   * @returns {string}
   */
  const getFormattedDate = str => {
    let date  = new Date( str );
    let day   = date.getDate();
    let month = date.getMonth() + 1;
    let year  = date.getFullYear();
    let formatterDay;

    if( day < 10 ) {
      formatterDay = '0'+ day;
    } else {
      formatterDay = day;
    }

    let formatterMonth;	
    if( month < 10 ) {
      formatterMonth = '0'+ month;
    } else {
      formatterMonth = month;
    }
    
    return formatterDay + '/' + formatterMonth + '/' + year;
  }

  /**
   * Torna o texto em uppercase
   * @param {string} str 
   * @returns {string}
   */
  const capitalize = str => {
    str = str.toString();
    return str[ 0 ].toUpperCase() + str.slice( 1 );
  }

  /**
   * Fecha o modal de adicionar
   * @returns void
   */
  const handleCloseModalAdd = () => {
    setShowModalAdd( false );
  }

  /**
   * Fecha o modal de editar
   * @returns void
   */
  const handleCloseModalEditar = () => {
    setShowModalEditar( false );
  }

  /**
   * Fecha o modal de desativar
   * @returns void
   */
  const handleCloseModalDisabled = () => {
    setShowModalDisabled( false );
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
          <article className="col-md-12 stretch-card">
            <Table
              title   ={ `Laboratórios de ${ municipio.nome }` }
              columns ={ columns }
              data    ={ rows }
              options ={ options }
              turnRed ={ "ativo" }
            />
          </article>
        </div>
        <ModalUpdate 
          show={ showModalEditar }
          handleClose={ handleCloseModalEditar }
          laboratorio={ laboratorio }
          id = { id }
        />
        <ModalAdd show={ showModalAdd } handleClose={ handleCloseModalAdd } />
        <ModalDisabled show={ showModalDisabled } handleClose = { handleCloseModalDisabled }/>
      </section>
    </>
  );
}

/**
 * Mapeia os estados do reduce para o props do componente
 * @param {Object} state estado global do reduce
 * @returns {Object}
 */
const mapStateToProps = state => ( {
  municipio_id: state.appConfig.usuario.municipio.id,
  municipio   : state.appConfig.usuario.municipio,
  localidades : state.localidade.localidades,
  laboratorios: state.nw_laboratorio.laboratorios,
  reload      : state.localidade.reload,
  toast       : state.appConfig.toast
} );

/**
 * Mapeia as actions para o props do componente
 * @param {*} dispatch 
 * @returns 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    changeSidebar,
    changeTableSelected,
    getLaboratoriosRequest,
    updateLaboratoryRequest,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Laboratorios );
