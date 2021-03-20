import styled from 'styled-components';
import { Color } from '../../../../styles/global';

export const Container = styled.div`
`;

export const AtividadeCard = styled.div`
  margin-top: 30px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid ${ Color.border_light };
  border-top: 6px solid transparent;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 30%);
  transition: box-shadow .3s ease-in-out;
  transition: border .3s ease-in-out;

  &.active {
    border-top-color: ${ Color.info }
  }

  &:hover {
    border-top-color: ${ Color.info }
  }

  .ca-header {
    padding: 15px 15px 0;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    .ca-sub-title {
      display: block;
      font-size: .875em;
      color: #6c757d;

      &::before {
        content: "— ";
      }
    }
  }

  .ca-row-info {
    padding: 0 15px;
    margin-bottom: 15px;

    .ca-label {
      margin-bottom: 10px;
    }

    .ca-label, .ca-value {
      font-weight: 400;
      font-size: 13px;
    }
  }

  .ca-info {
    padding: 0 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;

    .ca-label, .ca-value {
      font-weight: 400;
      font-size: 13px;
    }

    .ca-value::after {
      content: " —";
    }
  }
`;
