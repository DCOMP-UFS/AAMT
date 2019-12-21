import styled from 'styled-components';

import { Color } from '../../../styles/global';

export const UlImovel = styled.ul`
  border: 1px solid ${ Color.border_light };
  list-style: none;
  padding: 0;
`;

export const LiImovel = styled.li`
  display: flex;
  cursor: pointer;
  /* flex-direction: column; */

  &:not(:last-child) {
    border-bottom: 1px solid #ebedf2;
  }

  &:hover > div:first-child {
    background: ${ Color.info };
  }

  &:hover {
    background: ${ Color.bgLight };
  }

  &.active {
    background: ${ Color.light };
  }

  &.active > div:first-child {
    background: ${ Color.success };
  }
`;

export const ContainerIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: .75rem .5rem;
  width: 75px;
  color: #fff;
  background: ${ Color.secondary };
`;

export const DivDescription = styled.div`
  flex-direction: column;
  padding: .75rem .5rem;

  p {
    margin-bottom: 0;
  }

  strong {
    color: #343a40;
  }
`;

export const LiEmpty = styled.li`
  padding: .75rem .5rem;
  text-align: center;

  h4 {
    color: ${ Color.muted };
  }
`;
