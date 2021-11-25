import styled from 'styled-components';
import { Color } from '../../styles/global';

export const ListaHorizontal = styled.ul`
  border: 1px solid ${ Color.border_light };
  flex: 1;
  list-style: none;
  padding: 0;
  max-height: 484px;
  overflow-y: auto;
`;

export const Item = styled.ul`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  cursor: pointer;

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

export const Icon = styled.div`
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
