import styled from 'styled-components';

import { Color, device } from '../../../../styles/global';

export const UlEquipe = styled.ul`
  border: 1px solid ${ Color.border_input };
  list-style: none;
  padding: 0;
  max-height: 484px;
  overflow-y: auto;
`;

export const LiEquipe = styled.li`
  display: flex;
  cursor: pointer;
  padding: 0.375rem 0 0.375rem 1.375rem;
  align-items: center;
  /* flex-direction: column; */

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  &:hover {
    background: ${ Color.bgLight };
  }
`;

export const ContainerCheck = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  padding: 0.375rem 0.375rem;
  color: #fff;
`;

export const DivDescription = styled.div`
  padding: 0.375rem 1.375rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

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

export const LiEmpty = styled.li`
  padding: 0.375rem 1.375rem;
  text-align: center;

  h4 {
    margin: 0!important;
    color: ${ Color.muted };
  }
`;

export const Arrows = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UlLocal = styled.ul`
  border: 1px solid ${ Color.border_input };
  list-style: none;
  padding: 0;
  max-height: 484px;
  overflow-y: auto;
`;

export const LiLocal = styled.li`
  display: flex;
  cursor: pointer;
  padding: 0.375rem 0 0.375rem 1.375rem;
  align-items: center;
  /* flex-direction: column; */

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  &:hover {
    background: ${ Color.bgLight };
  }
`;
