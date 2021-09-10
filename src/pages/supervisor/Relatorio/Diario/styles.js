import styled from 'styled-components';
import { Color } from '../../../../styles/global';

export const Container = styled.div`
  .lista-membros {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;

    li {
      padding: 8px 15px;
      cursor: pointer;
      border-bottom: 1px solid rgba(0,0,0,.3);
      border-left: 1px solid rgba(0,0,0,.3);
      border-right: 1px solid rgba(0,0,0,.3);
      transition: background .3s ease-in-out;


      &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-top: 1px solid rgba(0,0,0,.3);
      }

      &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;

      }

      &:hover {
        background: ${ Color.info };
        border-color: ${ Color.info };
        color: #FFFFFF;
      }
    }
  }
`;

export const PanelTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;

  p {
    margin-bottom: 0;
    flex: 1;
  }

  small {
    margin-bottom: 0;
    flex: 1;
  }
`;
