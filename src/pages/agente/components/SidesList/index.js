import React from 'react';

import { Container } from './styles';

function SidesList({ lados, ...props }) {
  return (
    <Container>
      <ul className="sides">
        {
          lados.map(( l, index ) => (
            <li key={ index }>{ l.rua.nome }</li>
          ))
        }
      </ul>
    </Container>
  );
}

export default SidesList;
