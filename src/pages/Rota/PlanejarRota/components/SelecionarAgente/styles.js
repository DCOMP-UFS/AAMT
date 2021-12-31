import styled from 'styled-components';
import { Color } from '../../../../../styles/global';

export const Container = styled.div`

`;

export const EquipeCard = styled.div`
  margin-top: 30px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 30%);
  transition: box-shadow .3s ease-in-out;
  transition: border .3s ease-in-out;

  .ag-header {
    padding: 8px 15px;
    display: flex;
    background: ${ Color.info };
    color: #fff;
    align-items: center;
    height: 65px;

    .icon {
      margin-right: 10px;
    }

    input {
      background: transparent;
      border: none;
      color: #fff;
      width: 100%;
      padding: 0 8px;
      height: 30px;

      &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #fff;
        opacity: 1; /* Firefox */
      }

      &:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #fff;
      }

      &::-ms-input-placeholder { /* Microsoft Edge */
        color: #fff;
      }
    }
  }

  .ag-body {
    .lista-membros {
      list-style: none;
      padding: 0;
      margin: 0;

      .membro {
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 4px 15px;
        cursor: pointer;

        &:first-child, &:last-child {
          padding: 8px 15px;
        }

        &.active {
          background: ${ Color.border_input }
        }

        &:not(.active):hover {
          background-color: ${ Color.border_light }
        }

        .foto {
          width: 45px;
          height: 45px;
          border-radius: 50px;
          background: #ABA2A2;
          font-size: 1.5rem;
          align-items: center;
          display: flex;
          justify-content: center;
          margin-right: 10px;
          color: ${ Color.light };
        }
      }
    }
  }
`;
