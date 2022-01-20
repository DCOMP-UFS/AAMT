import styled from 'styled-components';
import { Color } from '../../../../../styles/global';

export const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 340px);
  position: relative;
`;

export const ContainerAtividades = styled.div`
  ul.lista-atividades {
    padding: 0;
    margin: 0;
    list-style: none;

    li.item {
      width: 41.8px;
      height: 41.8px;
      text-align: center;
      line-height: 41.8px;
      position: relative;
      opacity: .6;
      cursor: pointer;
      transition: background .3s ease-in-out;

      &:hover, &.active {
        opacity: 1;
        background: #fff;
        border-right: 3px solid ${ Color.info };
      }
    }
  }
`;

export const ContainerEquipes = styled.div`
  min-width: 250px;
  background: #fff;
  box-shadow: 2px 2px 8px #c5baba;
  border-bottom-left-radius: 5px;
  overflow-y: scroll;
  max-height: calc(100vh - 340px);

  ul.lista-equipes {
    list-style: none;
    padding: 0;
    margin: 0;

    li.item {
      .apelido {
        display: block;
        width: 100%;
        padding: 8px 15px;
        border-bottom: 1px solid rgba(0,0,0,.2);
      }

      &:not(:first-child) {
        .apelido {
          border-top: 1px solid rgba(0,0,0,.2);
        }
      }
    }
  }

  ul.lista-membros {
    list-style: none;
    padding: 0;
    margin: 0;

    li.item {
      padding: 8px 15px;
      display: flex;
      align-items: center;
      cursor: pointer;

      &.active {
        background: #198ae37d;
      }

      .avatar {
        width: 30px;
        height: 30px;
        background: gray;
        display: block;
        border-radius: 50%;
        margin-right: 10px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        overflow: hidden;

        img {
          width: 30px;
        }
      }
    }
  }
`;

export const ContainerMap = styled.div`
  flex: 1;
  background: #fff;
  box-shadow: 4px 2px 8px #c5baba;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;
