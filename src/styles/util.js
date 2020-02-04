import styled from 'styled-components';

export const ContainerFixed = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
`;

export const ContainerArrow = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  div button:first-child {
    margin-right: 4px;
  }

  div button:not(:first-child) {
    margin-right: 4px;
  }

  div button:not(:last-child) {
    margin-left: 4px;
  }

  div button:last-child {
    margin-left: 4px;
  }
`;
