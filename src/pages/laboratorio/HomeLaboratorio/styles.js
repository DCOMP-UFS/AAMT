import styled from 'styled-components';
import { Color } from '../../../styles/global';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const ListCard = styled.ul`
  position: fixed;
  z-index: 10;
  right: 10px;
  top: 60px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const CardInfo = styled.li`
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;
  word-wrap: break-word;
  border: 1px solid ${ Color.border_light };

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
