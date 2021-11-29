/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
// import { changeSidebar } from '../../store/Sidebar/sidebarActions';

function Home({ zonas, municipio_id, ...props }) {

  return (
    <section className="card-list">
      <div className="row">
        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
