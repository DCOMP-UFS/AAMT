/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebar';

// STYLES
// import { ContainerMap } from './styles';
import { FormGroup, selectDefault } from '../../../../styles/global';

function PlanejarAtividade({ ...props }) {
  useEffect(() => {
    props.changeSidebar(2, 2);
  }, []);

  function handleSubmit( e ) {
    e.preventDefault();
  }

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
