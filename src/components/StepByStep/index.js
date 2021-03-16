import React, { useState, useEffect } from 'react';

import { Container, StepControl } from './styles';
import { Button } from '../../styles/global';

function StepByStep({ init_step = 0, steps = [], handleFree = false, ...props }) {
  const [ indexStep, setIndexStep ] = useState( init_step );

  return (
    <Container>
      <div className="menu-steps">
        <ul className="steps">
          {
            steps.map((step, index) => {
              return (
                <li
                  onClick={ () => setIndexStep( index ) }
                  key={ step.slug ? step.slug : index }
                  className={`step-item ${ indexStep == index ? 'active' : '' }`}
                >{ step.name }</li>
              )
            })
          }
        </ul>
      </div>
      <div className="content">
        {
          steps.map((step, index) => {
            return(
              <div
                key={ step.slug }
                className={`content-item ${ indexStep == index ? 'active' : '' }`}>
                { step.content }
              </div>
            );
          })
        }

        <StepControl>
          <Button
            type="button"
            className={ `secondary ${ indexStep > 0 ? 'visible' : 'invisible' }` }
          >
            Voltar
          </Button>
          <Button
            type="button"
            className="info"
          >
            {
              indexStep === steps.length - 1 ? 'Salvar' : 'Avançar'
            }
          </Button>
        </StepControl>
      </div>
    </Container>
  );
}

export default StepByStep;
