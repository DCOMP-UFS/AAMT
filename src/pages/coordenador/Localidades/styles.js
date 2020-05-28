import styled, { createGlobalStyle } from 'styled-components';

import { Color, device } from '../../../styles/global';

export const GlobalStyle = createGlobalStyle`
  table tbody tr {
    cursor: pointer;
  }
`

export const UlStreet = styled.ul`
  border: 1px solid ${ Color.border_input };
  list-style: none;
  padding: 0;
  max-height: 232px;
  overflow-y: auto;
`;

export const Street = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid ${ Color.border_input };
  }

  &:hover {
    background: ${ Color.border_light };
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

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0.375rem 0 0.375rem 1.375rem;
`;

