import styled from 'styled-components';
import { Color } from '../../../../styles/global';

export const Container = styled.div`
  .atividade {
    cursor: pointer;
    transition: transform .3s ease-in-out;

    &:hover {
      transform: translateY(-5px);
    }
  }
`;
