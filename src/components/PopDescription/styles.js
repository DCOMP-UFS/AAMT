import styled from 'styled-components';
import { Color } from '../../styles/global';

export const Container = styled.span`
  .pop-description .icon {
    color: #adb5bd;
    cursor: pointer;
    margin-top: -3px;
    transition: color 0.3s ease;

    &:hover {
      color: ${ Color.info }
    }
  }
`;
