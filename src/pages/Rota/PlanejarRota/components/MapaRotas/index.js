import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaClipboardList } from 'react-icons/fa';
import ReactMapGL, { Marker } from 'react-map-gl';
import Loading from '../../../../../components/Loading';
import img_home_icon from '../../../../../assets/home-icon.png';

import { setCarregandoRota } from '../../../../../store/Rota/rotaActions';

// STYLES
import { Container, ContainerAtividades, ContainerEquipes, ContainerMap } from './styles';

export const MapaRotas = ({ rotas_planejadas, fl_carregando_rota, ...props }) => {
  const [ indexAtividade, setIndexAtividade ] = useState( 0 );
  const [ indexEquipe, setIndexEquipe ] = useState( -1 );
  const [ indexRota, setIndexRota ] = useState( -1 );
  const [ marcadores, setMarcadores ] = useState( [] );
  const [ viewport, setViewport ] = useState({
    width: '100%',
    height: '100%',
    latitude: -15.7801,
    longitude: -47.9292,
    zoom: 2
  });

  useEffect(() => {
    props.setCarregandoRota( false );
  }, [ rotas_planejadas ]);

  const setMarkMap = ( indexE, indexR ) => {
    setIndexEquipe( indexE );
    setIndexRota( indexR );

    const rota_selecionada = rotas_planejadas[ indexAtividade ].equipes[ indexE ].rota[ indexR ];

    let marks = [];
    rota_selecionada.rota.forEach( rota => {
      marks = [ ...marks, ...rota.imoveis ];
    });

    setViewport({
      ...viewport,
      latitude: parseFloat( marks[ 0 ].lat ),
      longitude: parseFloat( marks[ 0 ].lng ),
      zoom: 14
    });
    setMarcadores( marks );
  }

  return (
    <Container id={ props.id }>
      {
        fl_carregando_rota ?
          <Loading element={ "#" + props.id } /> :
          <>
            <ContainerAtividades>
              <ul className="lista-atividades">
                {
                  rotas_planejadas.map( ( rota, index ) => (
                  <li
                    key={ 'rota_' + rota.id }
                    className={ `item ${ indexAtividade === index ? 'active' : '' }` }
                    onClick={ () => setIndexAtividade( index ) }
                  >
                    <span><FaClipboardList /></span>
                  </li>
                  ))
                }
              </ul>
            </ContainerAtividades>
            <ContainerEquipes>
              <ul className="lista-equipes">
                {
                  rotas_planejadas.length > 0 ?
                    (
                      rotas_planejadas[ indexAtividade ].equipes.map(( equipe, indexE ) => (
                        <li key={ 'equipe_' + equipe.id } className="item">
                          <span className="apelido">{ equipe.apelido ? equipe.apelido : 'Equipe' }</span>
                          <ul className="lista-membros">
                            {
                              equipe.rota.map(( r, indexR ) => (
                                <li
                                  key={ 'td_' + r.id }
                                  className={ `item ${ indexEquipe === indexE && indexRota === indexR ? 'active' : '' }` }
                                  onClick={ () => setMarkMap( indexE, indexR ) }
                                >
                                  <span className="avatar">
                                    {
                                      r.usuario.avatar ?
                                        (
                                          <img src={ r.usuario.avatar.url } />
                                        ) :
                                        ( r.usuario.nome[ 0 ]  )
                                    }
                                  </span>
                                  <span className="nome">{ r.usuario.nome }</span>
                                </li>
                              ))
                            }
                          </ul>
                        </li>
                      ))
                    ) :
                    (<div />)
                }
              </ul>
            </ContainerEquipes>
            <ContainerMap>
              <ReactMapGL
                { ...viewport }
                onViewportChange={ nextViewport => setViewport( nextViewport ) }
                mapboxApiAccessToken={ process.env.REACT_APP_MAP_TOKEN }
              >
                {
                  marcadores.map( ( marcador, index ) => {
                    // const vistorias = marcador.vistorias;

                    return (
                      <Marker
                        key={ 'mark_' + index }
                        latitude={ parseFloat( marcador.lat ) }
                        longitude={ parseFloat( marcador.lng ) }
                        offsetLeft={ -20 }
                        offsetTop={ -10 }
                      >
                        <img
                          src={
                            img_home_icon
                            // inspection ? img_home_icon_green : img_home_icon
                          }
                          width="25"
                        />
                      </Marker>
                    )
                  })
                }
              </ReactMapGL>
            </ContainerMap>
          </>
      }
    </Container>
  )
}

const mapStateToProps = state => ({
  rotas_planejadas: state.rota.rotas_planejadas,
  fl_carregando_rota: state.rota.fl_carregando_rota
})

const mapDispatchToProps = {
  setCarregandoRota
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( MapaRotas );
