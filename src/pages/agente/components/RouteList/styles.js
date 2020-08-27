import styled from 'styled-components';
import { Color } from '../../../../styles/global';

export const Container = styled.div`
  ul.rota {
    list-style: none;
    padding: 0;
    margin: 0;

    .block-city {
      display: flex;
      border-bottom: 1px solid ${ Color.border_input };
      padding: 15px 0 5px 0;

      .div-circle {
        width: 35px;
        height: 35px;
        border-radius: 50px;
        color: #fff;
        line-height: 35px;
        text-align: center;
        font-weight: bold;
        margin-right: 20px;
        background-color: ${ Color.info };
      }
    }
  }
`;
