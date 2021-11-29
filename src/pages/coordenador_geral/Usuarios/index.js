/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { perfil } from '../../../config/enumerate';
import ModalAdd from './ModalAdd';
import ModalDesativar from './ModalDesativar';
import Table, { ButtonAdd, ButtonDesabled } from '../../../components/Table';
import { getDateBr } from '../../../config/function';
import { FaUsers } from 'react-icons/fa';


// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/SidebarCoordGeral/sidebarCoordGeralActions';
import { changeTableSelected } from '../../../store/SupportInfo/supportInfoActions';
import { clearToast } from '../../../store/AppConfig/appConfigActions';
import { getUsersByRegionalRequest, changeUserEditIndex, } from '../../../store/actions/UsuarioActions';

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
  {
    name: "nome",
    label: "Nome",
    options: {
      filter: false,
      sortDirection: 'asc'
    }
  },
  {
    name: "email",
    label: "E-mail",
    options: {
      filter: false,
    }
  },
  "Regional",
  "Cód. Município",
  "Município",
  {
    name: "createdAt",
    label: "Criado em",
    options: {
      filter: false,
      display: 'false'
    }
  },
  "Perfil",
  "Ativo"
];

function MapPerfil( atuacoes ) {
  const perfis = atuacoes.map( at => {
    const [tipoPerfil] = Object.entries(perfil).find(([key, value]) => {
      return at.tipoPerfil === value.id;
    });

    return perfil[tipoPerfil].label;
  });

  return perfis[0];
}

function Usuarios({ regionalSaude_id, usuarios, ...props }) {
  const [ rows, setRows ] = useState([]);
  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          title="Adicionar"
          data-toggle="modal"
          data-target="#modal-novo-usuario" />
      );
    },
    customToolbarSelect: ({ data }) => {
      props.changeTableSelected('tableUser', data);
      return (
        <ButtonDesabled
          title="Desabilitar usuário"
          data-toggle="modal"
          data-target="#modal-desativar-usuario"
          data={ data } />
      );
    },
    setRowProps: (row) => {
      const className = row[7] === "Não" ? "row-desabled" : "";

      return {
        className
      }
    },
    onRowClick: (row, ...props) => {
      const id = row[0].props['data-id'];

      window.location = `${ window.location.origin.toString() }/cg/usuarios/${ id }`;
    }
  };

  useEffect(() => {
    props.changeSidebar(3, 1);
    props.getUsersByRegionalRequest( regionalSaude_id );
  }, []);

  useEffect(() => {
    createRows();
  }, [ usuarios, props.reload ]);

  function createRows() {
    const users = usuarios.map( (user, index) => (
      [
        { index: (index + 1), id: user.id },
        user.nome,
        user.email,
        user.municipio ? user.municipio.regional.nome : user.regionalSaude.nome,
        user.municipio ? user.municipio.codigo : " - ",
        user.municipio ? user.municipio.nome : " - ",
        getDateBr(user.createdAt),
        MapPerfil(user.atuacoes),
        user.ativo ? "Sim" : "Não"
      ]
    ));

    setRows( users );
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
          <PageIcon><FaUsers /></PageIcon>
          Usuários
        </h3>
      </PageHeader>
      <GlobalStyle />
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <Table
              title="Usuários"
              columns={ columns }
              data={ rows }
              options={ options }
            />
          </article>
        </div>

        <ModalAdd />
        <ModalDesativar />
      </section>
      <ToastContainer />
      { props.toast.message && notify() }
    </>
  );
}

const mapStateToProps = state => ({
  regionalSaude_id: state.appConfig.usuario.regionalSaude.id,
  usuarios: state.usuario.usuarios,
  reload: state.usuario.reload,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getUsersByRegionalRequest, clearToast, changeUserEditIndex, changeTableSelected }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Usuarios);
