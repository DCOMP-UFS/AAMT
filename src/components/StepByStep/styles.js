import styled from 'styled-components';
import { Color } from '../../styles/global';

export const Container = styled.div`
  background-color: #fff;
  display: flex;
  border-radius: 5px;



  .content {
    flex: 1;
    padding: 15px;

    .content-item {
      &:not(.active) {
        display: none;
      }
    }
  }
`;
