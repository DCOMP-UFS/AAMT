import styled from 'styled-components';

import { device } from '../../../styles/global'

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h4 {
    margin: 0;
  }
`;

export const DescricaoAtividade = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  strong {
    color: #343a40;
  }

  @media ${ device.tablet } {
    & div:first-child {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

export const ObjetivoAtividade = styled.span`
  height: 24.8px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
