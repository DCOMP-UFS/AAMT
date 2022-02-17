import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaChartPie } from 'react-icons/fa';
import { Row } from 'react-bootstrap';
import ReactMapGL from 'react-map-gl';
import Select from 'react-select';

// ACTIONS
import { changeSidebar } from '../../../store/Sidebar/sidebarActions';
import { getAmostrasRequest, getAmostrasByLab } from '../../../store/Amostra/amostraActions';

// STYLES
import { PageIcon, PageHeader } from '../../../styles/util';
import { selectDefault } from '../../../styles/global';

export const HomeSupervisor = ({ ...props }) => {
  const [ viewport, setViewport ] = useState({
    width: '100%',
    height: '423px',
    latitude: -15.7801,
    longitude: -47.9292,
    zoom: 2
  });

  useEffect(() => {
    //props.getAmostrasRequest(1);
    props.getAmostrasByLab(null);
    //props.changeSidebar( "dashboard_municipío" );
  });

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaChartPie /></PageIcon>
          Dashboard
        </h3>
      </PageHeader>

      <section className="card-list">
        <Row>
          <article className="col-12 col-md-8">
            <div className="card2" style={{ height: '500px' }}>
              <div className="card2-header">
                <Select
                  value={ {} }
                  styles={ selectDefault }
                  options={ [] }
                  onChange={ e => {} }
                />
              </div>
              <ReactMapGL
                { ...viewport }
                onViewportChange={ nextViewport => setViewport( nextViewport ) }
                mapboxApiAccessToken={ process.env.REACT_APP_MAP_TOKEN }
              ></ReactMapGL>
            </div>
          </article>
          <article className="col-12 col-md-4">
            <div className="card2" style={{ height: '100%' }}>
              <div className="card2-header">
                <h3 className="title">Situação das Amostras</h3>
              </div>
            </div>
          </article>
        </Row>
      </section>
    </>
  )
}

const mapStateToProps = state => ({
  usuario     : state.appConfig.usuario,
  amostras    : state.amostra.amostras,
  laboratorios: state.nw_laboratorio.laboratorios
});

const mapDispatchToProps = {
  changeSidebar,
  getAmostrasByLab,
  getAmostrasRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( HomeSupervisor )
