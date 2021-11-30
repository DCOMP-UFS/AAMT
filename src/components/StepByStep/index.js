import React, { useState, useEffect } from 'react';

import { Container, StepControl } from './styles';
import { Button } from '../../styles/global';

function StepByStep({ init_step = 0, steps = [], handleFree = false, ...props }) {
  const [ indexStep, setIndexStep ] = useState( init_step );

  const next = () => {
    // setIndexStep( indexStep + 1 < steps.length ? indexStep + 1 : indexStep );
  }

  const prev = () => {
    setIndexStep( indexStep - 1 >= 0 ? indexStep - 1 : 0 );
  }

  return (
    <Container>

    </Container>
  );
}

export default StepByStep;
