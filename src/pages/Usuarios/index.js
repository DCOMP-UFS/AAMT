/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/TableComponent';
import { perfil } from '../../config/enumerate';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Block from '@material-ui/icons/Block';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import ModalAdd from './ModalAdd';
import ModalDesativar from './ModalDesativar';
import ModalUpdate from './ModalUpdate';
import ButtonEdit from './ButtonEdit';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/actions/sidebar';
import { clearToast } from '../../store/actions/appConfig';
import { getUsuariosRequest, changeUserEditIndex } from '../../store/actions/UsuarioActions';

// STYLES
import { GlobalStyle } from './styles';

function createRowUser(id, nome, email, createdAt, tipoPerfil, actions) {
  let perfilUser = Object.entries(perfil).find(([key, value]) => {
    return tipoPerfil === value;
  });

  perfilUser[0] = perfilUser[0].replace(/^\w/, c => c.toUpperCase());

  const data = new Date( createdAt );

  let dia  = data.getDate().toString();
  dia = (dia.length === 1) ? '0'+dia : dia;
  let mes  = (data.getMonth()+1).toString(); //+1 pois no getMonth Janeiro começa com zero.
  mes = (mes.length === 1) ? '0'+mes : mes;
  let ano = data.getFullYear();

  let hh = data.getHours();
  hh = (hh < 10) ? '0'+hh : hh;
  let mm = data.getMinutes();
  mm = (mm < 10) ? '0'+mm : mm;

  return {
    id: id + 1,
    nome,
    email,
    createdAt: `${ hh }:${ mm } - ${ dia }/${ mes }/${ ano }`,
    tipoPerfil: perfilUser[0],
    actions
  }
}

function createHeadCell(id, align, label) {
  return { id, align, disablePadding: false, label }
}

function Usuarios({ municipio_id, usuarios, ...props }) {
  const [ rows, setRows ] = useState([]);
  const [ headCells ] = useState([
    createHeadCell('id', 'left', '#'),
    createHeadCell('nome', 'left', 'Nome'),
    createHeadCell('email', 'left', 'E-mail'),
    createHeadCell('createdAt', 'left', 'Criado em'),
    createHeadCell('tipoPerfil', 'left', 'Perfil'),
    createHeadCell('actions', 'right', '')
  ]);

  useEffect(() => {
    props.changeSidebar(4, 1);
    props.getUsuariosRequest( municipio_id );
  }, []);

  useEffect(() => {
    createRows();
  }, [usuarios]);

  function createRows() {
    const users = usuarios.map( (user, index) => (
      createRowUser(
        index,
        user.nome,
        user.email,
        user.createdAt,
        user.tipoPerfil,
        [ButtonEdit, index]
      )
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
              <TableComponent
                id="tableUser"
                title="Usuários"
                description="Lista de usuários no sistema"
                reload={ props.reload }
                rows={ rows }
                headCells={ headCells }
                TypographyTable={ TypographyUser }
                TooltipSelected={ TooltipSelected }
                TooltipUnselected={ TooltipUnselected } />
            </div>
          </article>
        </div>

        <ModalAdd />
        <ModalDesativar />
        <ModalUpdate />
      </section>
      <ToastContainer />
      { props.toast.message && notify() }
    </>
  );
}

function TypographyUser(props) {
  return (
    <Typography className={ props.className } color="inherit" variant="subtitle1">
      { props.children }
    </Typography>
  )
}

function TooltipSelected( props ) {
  return(
    <Tooltip
      title="Desativar usuário(s)"
      className="bg-light"
      onClick={() => $('#modal-desativar-usuario').modal('show') } >
      <IconButton aria-label="desativar">
        <Block />
      </IconButton>
    </Tooltip>
  );
}

function TooltipUnselected( props ) {
  return(
    <Tooltip
      title="Novo usuário"
      className={ props.className }
      data-toggle="modal"
      data-target="#modal-novo-usuario" >
      <IconButton aria-label="more" className="text-success">
        <AddBoxIcon />
      </IconButton>
    </Tooltip>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.usuario.usuario.municipio.id,
  usuarios: state.usuario.usuarios,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getUsuariosRequest, clearToast, changeUserEditIndex }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Usuarios);
