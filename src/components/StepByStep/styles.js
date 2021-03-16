import styled from 'styled-components';
import { Color } from '../../styles/global';

export const Container = styled.div`
  background-color: #fff;
  display: flex;
  border-radius: 5px;

  .menu-steps {
    max-width: 250px;
    width: 100%;
    border-right: 1px solid ${ Color.border_light };

    ul.steps {
      list-style: none;
      padding: 0;
      margin: 0;

      li.step-item {
        padding: 10px 15px;
        font-size: 1rem;
        position: relative;
        transition: all .3s ease-in-out;

        &::before {
          content: '';
          position: absolute;
          height: 100%;
          width: 25px;
          right: 0;
          top: 0;
          border-right: 0px solid ${ Color.info };
          transition: all .3s ease-in-out;
        }

        &:not(:last-child) {
          border-bottom: 1px solid ${ Color.border_light }
        }

        &.active::before {
          content: '';
          position: absolute;
          height: 100%;
          width: 25px;
          right: 0;
          top: 0;
          border-right-width: 6px;
        }

        &:hover {
          opacity: 1!important;
        }

        &:hover::before {
          border-right-width: 6px;
        }

        &:not(.active) {
          opacity: 0.6;
        }
      }
    }
  }

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

export const StepControl = styled.div`
  display: flex;
  padding: 30px 0 0;
  align-items: center;
  justify-content: space-between;
`;
