import styled, { createGlobalStyle } from 'styled-components';

import { Color, device } from '../../../styles/global';

export const GlobalStyle = createGlobalStyle`
  table tbody tr {
    cursor: pointer;
  }
`;

export const ContainerSide = styled.div`
  border: 1px solid ${ Color.border_input };
  padding: 15px;
`;

export const UlSides = styled.ul`
  border: 1px solid ${ Color.border_light };
  list-style: none;
  padding: 0;
  max-height: 484px;
  overflow-y: auto;
`;

export const LiSide = styled.li`
  display: flex;
  padding: 0.375rem 0 0.375rem 1.375rem;
  align-items: center;
  /* flex-direction: column; */

  &:not(:last-child) {
    border-bottom: 1px solid #ebedf2;
  }

  &:hover {
    background: ${ Color.bgLight };
  }

  &.active .ContainerIcon {
    background: ${ Color.success };
  }
`;

export const ContainerIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 35px;
  height: 35px;
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

  @media ${ device.tablet } {
    & div:first-child {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

export const Span = styled.span`
  @media ${ device.tablet } {
    display: none;
  }
`;

export const PanelTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;

  p {
    margin-bottom: 0;
    flex: 1;
  }

  small {
    margin-bottom: 0;
    flex: 1;
  }
`;

export const UlHouse = styled.ul`
  border: 1px solid ${ Color.border_light };
  flex: 1;
  list-style: none;
  padding: 0;
  max-height: 484px;
  overflow-y: auto;
`;

export const LiHouse = styled.li`
  display: flex;
  align-items: center;
  padding-right: 0.375rem;
  cursor: pointer;
  /* flex-direction: column; */

  &:not(:last-child) {
    border-bottom: 1px solid #ebedf2;
  }

  &:hover {
    background: ${ Color.light };
  }

  &.active .ContainerIcon {
    background: ${ Color.success };
  }

  div {
    display: flex;
    align-items: center;
  }
`;

export const Container = styled.div`
  flex: 1;
  padding: 0.375rem 0 0.375rem 1.375rem;
`;
