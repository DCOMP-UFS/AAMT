import styled from 'styled-components';
import { Color } from '../../../../../styles/global';

export const Container = styled.div`
  position: relative;

  .info-empty {
    width: 100%;
    height: 100%;
    position: absolute;
    text-align: center;
    padding-top: 50px;

    p {
      font-size: 1.2rem;
    }
  }
`;

export const StreetCard = styled.div`
  div.body {
    padding: 4px 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
  }

  div.footer {
    padding: 4px 8px 4px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba( 0, 0, 0, .03 );
  }

  &.success .footer {
    background-color: ${ Color.success };
  }

  &.warning .footer {
    background-color: ${ Color.warning };
  }
`;

export const Usuario = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  background: #fff;
  z-index: 2;
  box-shadow: 0px 0px 5px ${ Color.shadow_light };
  display: flex;
  align-items: center;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
`;

export const Avatar = styled.div`
  width: 35px;
  height: 35px;
  background: ${ Color.info };
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #fff;
  margin-right: 10px;
`;

export const Block = styled.div`
  margin-top: 30px;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 30%);
  transition: box-shadow .3s ease-in-out;
  transition: border .3s ease-in-out;

  &:not(:first-child) {
    padding-top: 15px;
  }

  &:not(:last-child) {
    padding-bottom: 5px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${ Color.border_input };
  }

  .sides {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;

    li {
      width: calc( 50% - 5px );
      text-align: left;
      margin-bottom: 10px;
      border: 1px solid ${ Color.border_input };
      border-radius: 4px;
      text-align: center;
      line-height: 20px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:not(.disabled):hover {
        box-shadow: 2px 2px 8px #c5baba;
        border: 1px solid ${ Color.info };
      }

      &.selected {
        color: #fff;
        background-color: ${ Color.info };
        border: 1px solid ${ Color.info };
      }

      &.disabled {
        opacity: 0.3;
        background: #ccc;
      }
    }
  }
`;
