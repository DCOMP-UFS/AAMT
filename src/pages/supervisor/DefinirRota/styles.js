import styled from 'styled-components';
import { Color } from '../../../styles/global';
import { stylesProps } from '../../../styles/util';

export const Article = styled.article`
`;

export const ListAtividade = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li:not(:last-child) {
    margin-bottom: 10px;
  }

  li {
    padding: 0.375rem 1.375rem;
    border: 1px solid ${ Color.border_input };
    border-left: 4px solid ${ Color.border_input };
    cursor: pointer;
    transition: background 0.2s ease-out, border 0.2s ease-out;

    &.active {
      border-left-color: ${ Color.success }
    }

    &:not(.active):hover {
      background: ${ Color.light };
      border-left-color: ${ Color.info }
    }

    mark {
      margin-right: 10px;
    }

    span:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export const Team = styled.a`
  display: block;
  padding: 15px;
  box-shadow: 0px 0px 3px ${ Color.shadow_light };
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.3s ease-out;

  &:hover {
    background: ${ Color.border_light };
    text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;

    li:not(:last-child) {
      margin-right: 10px;
    }

    li {
      margin-bottom: 10px;

      mark {
        background: ${ Color.info };
        color: #fff;
      }
    }
  }
`;

export const ContainerBlock = styled.div`
  border: 1px solid ${ Color.border_input };
  border-radius: 4px;
  padding: 30px;
  max-height: calc(100vh - 252px);
  min-height: calc(100vh - 252px);
  overflow: auto;

  .block {
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
  }
`;

export const MemberRoutes = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: calc(100vh - 310px);
  min-height: calc(100vh - 310px);
  overflow: auto;

  li {
    display: flex;
    align-items: center;
    border-right: 1px solid ${ Color.border_input };
    border-left: 4px solid ${ Color.border_input };
    justify-content: space-between;
    padding-right: 0.375rem;

    &:first-child:last-child {
      border-bottom: 1px solid ${ Color.border_input };
    }

    &:first-child {
      border-top: 1px solid ${ Color.border_input };
    }

    &:last-child {
      border-bottom: 1px solid ${ Color.border_input };
    }

    span {
      padding: 0.375rem 0 0.375rem 1.375rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      flex: 1;

      mark {
        color: #fff;
        border-radius: 4px;
        margin-right: 10px;
        height: 30px;
        width: 30px;
        text-align: center;
        line-height: 30px;
        padding: 0;
        display: inline-block;
      }
    }

    button {
      /* margin: 8px 0.375rem 0.375rem 0.375rem; */
      padding: 5px;
      span {
        padding: 0;
      }
    }

    &.show {
      border-left-color: ${ Color.info }
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${ Color.border_input };
    }

    &:not(.saved):hover {
      border-left-color: ${ Color.info };
      background: ${ Color.light };
    }
  }
`;
