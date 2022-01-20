import styled, { createGlobalStyle } from 'styled-components';

export const Container = styled.article`
  .card-cycle {
    box-shadow: 2px 2px 8px #c5baba;
    margin-bottom: 30px;
  }
`;

export const GlobalStyle = createGlobalStyle`
  table tbody tr {
    cursor: pointer;
  }
`;
