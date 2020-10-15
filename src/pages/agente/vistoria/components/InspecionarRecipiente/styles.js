import styled from 'styled-components';
import { Color, device } from '../../../../../styles/global';

export const Container = styled.div`

`;

export const ContainerUnidade = styled.div`
  display: none;

  &.active {
    display: block;
  }
`;

export const Tratamento = styled.div`
  display: none;

  &.active {
    display: block;
  }
`;

export const ContainerTratamento = styled.div`
  width: calc(100% - 40px);
  padding: 10px;
  margin: auto;
  border-top: 1px solid ${ Color.dark };
`;

export const UlIcon = styled.ul`
  border: 1px solid ${ Color.border_input };
  list-style: none;
  padding: 0;
  max-height: 232px;
  overflow-y: auto;
`;

export const LiIcon = styled.li`
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

export const ListContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0.375rem 0 0.375rem 1.375rem;
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
