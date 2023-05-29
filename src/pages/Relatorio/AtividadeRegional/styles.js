import styled from 'styled-components';

export const Container = styled.div`
  .atividade {
    cursor: pointer;
    transition: transform .3s ease-in-out;

    &:hover {
      transform: translateY(-5px);
    }
  }
`;

export const CardBodyInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
