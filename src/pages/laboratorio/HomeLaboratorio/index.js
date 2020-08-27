import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Avatar from '@material-ui/core/Avatar';
require('dotenv').config();

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// COMPONENTS
import { Container, ListCard, CardInfo } from './styles';
// import { CardBody } from '../../../styles/global';

class HomeLaboratorio extends Component {
  render() {
    return (
      <Container>
        <Map
          className="map"
          google={this.props.google}
          zoom={14}
          panControl={ false }
          mapTypeControl={ false }
          scrollwheel={ false } >
          <Marker
            onClick={this.onMarkerClick}
            name={'Current location'} />
        </Map>

        <ListCard>
          <CardInfo>
            <Avatar className="bg-warning avatar">
              50
            </Avatar>

            <div className="ml-2">
              <h4 className="mb-0">Amostra(s) à inspecionar</h4>
            </div>
          </CardInfo>
          <CardInfo>
            <Avatar className="bg-success avatar">
              99+
            </Avatar>

            <div className="ml-2">
              <h4 className="mb-0">Amostra(s) inspecionadas</h4>
            </div>
          </CardInfo>
        </ListCard>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

const LoadingContainer = (props) => (
  <div>Carregando mapa...</div>
)

export default GoogleApiWrapper({
  apiKey: ( process.env.REACT_APP_API_URL ),
  LoadingContainer: LoadingContainer,
})(connect(
  mapStateToProps,
  // mapDispatchToProps
)(HomeLaboratorio));
