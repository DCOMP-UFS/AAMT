/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../../store/SidebarCoordGeral/sidebarCoordGeralActions';

// STYLES

function PlanejarAtividade({ ...props }) {
  useEffect(() => {
    props.changeSidebar(2, 1);
  }, []);

  return (
    <section className="card-list">
      <div className="row">

        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <h4 className="title">Planejamento da Atividade</h4>
            <p className="text-description">
              Atenção os campos com <code>*</code> são obrigatórios
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( PlanejarAtividade )
