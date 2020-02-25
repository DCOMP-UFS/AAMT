/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebar';

// STYLES
import { Header, ContainerAtividade } from './styles';
import { FormGroup, selectDefault } from '../../../styles/global';
import { InfoGroup } from '../../../styles/util';

function PlanejarAtividade({ ...props }) {
  useEffect(() => {
    props.changeSidebar(1, 1);
  }, []);

  function handleSubmit( e ) {
    e.preventDefault();
  }

  return (
    <section className="card-list">
      <Row>
        <ContainerAtividade
          className="theme-article col-md-4 stretch-card"
          onClick={ () => {
            window.location.href = window.location.origin.toString() + "/atividades/planejamento/1"
          }}
        >
          <div className="card">
            <h4 className="title mb-4">
              <mark className="bg-primary text-white">1</mark> Atividade
            </h4>

            <InfoGroup>
              <label>Metodologia</label>
              <p>LIRAa</p>
            </InfoGroup>

            <InfoGroup>
              <label>Objetivo</label>
              <p>LI = Lev. de índice</p>
            </InfoGroup>

            <InfoGroup>
              <label>Local</label>
              <p className="mb-0">Centro - Simão Dias</p>
            </InfoGroup>
          </div>
        </ContainerAtividade>

        <ContainerAtividade
          className="theme-article col-md-4 stretch-card"
          onClick={ () => {
            window.location.href = window.location.origin.toString() + "/atividades/planejamento/2"
          }}
        >
          <div className="card">
            <h4 className="title mb-4">
              <mark className="bg-primary text-white">2</mark> Atividade
            </h4>

            <InfoGroup>
              <label>Metodologia</label>
              <p>PNCD</p>
            </InfoGroup>

            <InfoGroup>
              <label>Objetivo</label>
              <p>LI = Lev. de índice</p>
            </InfoGroup>

            <InfoGroup>
              <label>Local</label>
              <p className="mb-0">Centro - Simão Dias</p>
            </InfoGroup>
          </div>
        </ContainerAtividade>

        <ContainerAtividade
          className="theme-article col-md-4 stretch-card"
          onClick={ () => {
            window.location.href = window.location.origin.toString() + "/atividades/planejamento/3"
          }}
        >
          <div className="card">
            <h4 className="title mb-4">
              <mark className="bg-primary text-white">3</mark> Atividade
            </h4>

            <InfoGroup>
              <label>Metodologia</label>
              <p>PNCD</p>
            </InfoGroup>

            <InfoGroup>
              <label>Objetivo</label>
              <p>LI = Lev. de índice</p>
            </InfoGroup>

            <InfoGroup>
              <label>Local</label>
              <p className="mb-0">Centro - Simão Dias</p>
            </InfoGroup>
          </div>
        </ContainerAtividade>
      </Row>
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
