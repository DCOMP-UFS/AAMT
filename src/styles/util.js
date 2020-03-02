import styled from 'styled-components';
import { Color, device } from './global';

export const ContainerFixed = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1;
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

export const InfoGroup = styled.div`
  label {
    font-weight: bold;
  }
`;

export const UlIcon = styled.ul`
  border: 1px solid ${ Color.border_input };
  flex: 1;
  list-style: none;
  padding: 0;
  max-height: 484px;
  overflow-y: auto;
`;

export const LiIcon = styled.li`
  display: flex;
  align-items: center;
  padding-right: 0.375rem;
  cursor: pointer;
  /* flex-direction: column; */

  &:not(:last-child) {
    border-bottom: 1px solid ${ Color.border_input };
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

export const LiEmpty = styled.li`
  padding: 0.375rem 1.375rem;
  text-align: center;

  h4 {
    margin: 0!important;
    color: ${ Color.muted };
  }
`;

export const ContainerUl = styled.div`
  flex: 1;
  padding: 0.375rem 0 0.375rem 1.375rem;
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
