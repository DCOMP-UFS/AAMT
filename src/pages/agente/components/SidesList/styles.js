import styled from 'styled-components';
import { Color } from '../../../../styles/global';

export const Container = styled.div`
  ul.sides {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;

    li {
      padding: 4px 8px;
      margin-bottom: 10px;
      border: 1px solid ${ Color.border_input };
      border-radius: 4px;
      margin-right: 10px;
      height: 30px;
      text-align: center;
      line-height: 20px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      color: #fff;
      background-color: ${ Color.info };
      border: 1px solid ${ Color.info };
    }
  }
`;
