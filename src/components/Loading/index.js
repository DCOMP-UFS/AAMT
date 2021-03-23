import React from 'react';
import { Pontos } from './styles';

export const Loading = ({ element, ...props }) => {
  return (
    <Pontos className="pontos">
      <div className="ponto"></div>
      <div className="ponto"></div>
      <div className="ponto"></div>
    </Pontos>
  )
}

export default Loading;
