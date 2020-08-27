import React from 'react';
import SidesList from '../SidesList';

import { Container } from './styles';

function RouteList({ quarteiroes, ...props }) {
  return (
    <Container>
      <ul className="rota">
        {
          quarteiroes.map(( q, index ) => {
            return (
              <li className="block-city" key={ index }>
                <div className="div-circle">{ q.numero }</div>
                <div>
                  <h4>Quarteirão</h4>
                  <div>
                    <SidesList lados={ q.lados } />
                  </div>
                </div>
              </li>
            );
          })
        }
      </ul>
    </Container>
  );
}

export default RouteList;
