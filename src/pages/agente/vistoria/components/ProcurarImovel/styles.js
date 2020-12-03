import styled from 'styled-components';

import { Color, device } from '../../../../../styles/global';

export const Container = styled.div`

`;

export const UlImovel = styled.ul`
  border: 1px solid ${ Color.border_light };
  list-style: none;
  padding: 0;
  max-height: 484px;
  overflow-y: auto;
`;

export const LiImovel = styled.li`
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

  &.active .ContainerIcon {
    background: ${ Color.success };
  }

  &.disabled {
    cursor: not-allowed;
    background: #ebedf2;
    opacity: 0.7;
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

  span {
    min-width: 50px;
    display: inline-block;
  }

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

export const Span = styled.span`
  @media ${ device.tablet } {
    display: none;
  }
`;
