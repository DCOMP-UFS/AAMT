/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { perfil } from '../../config/enumerate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalAdd from './ModalAdd';
import ModalDesativar from './ModalDesativar';
import Table, { ButtonAdd, ButtonDesabled } from '../../components/Table';
import { getDateBr } from '../../config/function';
import Typography from "@material-ui/core/Typography";


// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/actions/sidebar';
import { changeTableSelected } from '../../store/actions/supportInfo';
import { clearToast } from '../../store/actions/appConfig';
import { getUsuariosRequest, changeUserEditIndex, } from '../../store/actions/UsuarioActions';

// STYLES
import { GlobalStyle } from './styles';

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
  "Nome",
  "E-mail",
  "Criado em",
  "Perfil",
  "Ativo"
];

function MapPerfil(tipoPerfil) {
  let perfilUser = Object.entries(perfil).find(([key, value]) => {
    return tipoPerfil === value;
  });

  perfilUser[0] = perfilUser[0].replace(/^\w/, c => c.toUpperCase());
  return perfilUser[0];
}

function Usuarios({ municipio_id, usuarios, ...props }) {
  const [ rows, setRows ] = useState([]);
  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          toggle="modal"
          target="#modal-novo-usuario" />
      );
    },
    customToolbarSelect: ({ data }) => {
      props.changeTableSelected('tableUser', data);
      return (
        <ButtonDesabled
          toggle="modal"
          target="#modal-desativar-usuario"
          data={ data } />
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

      window.location = `${ window.location.origin.toString() }/usuarios/${ id }`;
    }
  };

  useEffect(() => {
    props.changeSidebar(3, 1);
    props.getUsuariosRequest( municipio_id );
  }, []);

  useEffect(() => {
    createRows();
  }, [ usuarios ]);

  useEffect(() => {
    createRows();
  }, [ props.reload ]);

  function createRows() {
    const users = usuarios.map( (user, index) => (
      [
        { index: (index + 1), id: user.id },
        user.nome,
        user.email,
        getDateBr(user.createdAt),
        MapPerfil(user.tipoPerfil),
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
      <GlobalStyle />
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <Table
                title="Usuários"
                columns={ columns }
                data={ rows }
                options={ options } />
            </div>
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
  usuarios: state.usuario.usuarios,
  reload: state.usuario.reload,
  municipio_id: state.usuario.usuario.municipio.id,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getUsuariosRequest, clearToast, changeUserEditIndex, changeTableSelected }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Usuarios);
