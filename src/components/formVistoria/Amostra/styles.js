import styled from 'styled-components';

import { Color } from '../../../styles/global';

export const Container = styled.div`
  padding: 15px;
`;

export const UlAmostra = styled.ul`
  border: 1px solid ${ Color.border_light };
  list-style: none;
  padding: 0;
`;

export const LiAmostra = styled.li`
  display: flex;
  cursor: pointer;
  padding: 0.375rem 0 0.375rem 1.375rem;
  align-items: center;
  /* flex-direction: column; */

  &:not(:last-child) {
    border-bottom: 1px solid #ebedf2;
  }

  &:hover {
    background: ${ Color.bgLight };
  }
`;

export const ContainerIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  padding: 0.375rem 0.375rem;
  color: #fff;
  background: ${ Color.primary };
`;

export const DivDescription = styled.div`
  padding: 0.375rem 1.375rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  strong {
    color: #343a40;
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

export const UlUnidade = styled.ul`
  border: 1px solid ${ Color.border_light };
  list-style: none;
  padding: 0;
  max-height: 225px;
  overflow-y: scroll;
`;

export const LiUnidade = styled.li`
  display: flex;
  cursor: pointer;
  padding: 0.375rem 0 0.375rem 1.375rem;
  align-items: center;
  /* flex-direction: column; */

  &:not(:last-child) {
    border-bottom: 1px solid #ebedf2;
  }

  &:hover {
    background: ${ Color.bgLight };
  }
`;

export const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconDelete = styled.div`
`;
