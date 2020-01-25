import React, { useEffect } from 'react';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/actions/sidebar';
import { getUsuariosRequest } from '../../store/actions/UsuarioActions';

// STYLES
import { UlUser, LiUser } from './styles';

function Usuarios( props ) {
  useEffect(() => {
    props.changeSidebar(4, 1);
  });

  useEffect(() => {
    props.getUsuariosRequest();
  });

  return (
    <section className="card-list">
      <div className="row">

        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <h4 className="title">Usuários</h4>
            <p className="text-description">
              Lista de usuários no sistema
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar, getUsuariosRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Usuarios);
