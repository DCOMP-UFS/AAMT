import styled from 'styled-components';

import { device } from '../../../styles/global'

export const ContainerAtividade = styled.article`
  padding-top: 0!important;

  .card-atividade {
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
    box-shadow: 2px 2px 8px #c5baba;
  }
`;

export const Header = styled.div`
  padding: 20px;
  background: #198ae3;
  display: flex;
  color: #fff;

  .icon {
    margin-right: 10px;
  }

  .info {
    .title {
      color: #fff;
      text-align: left;
      margin-bottom: 5px;
    }

    span {
      font-size: 14px;
    }
  }
`;

export const Body = styled.div`
  padding: 20px;

  .info-group {
    display: flex;

    label {
      min-width: 133.36px;
      font-size: 15px!important;
      line-height: 20px!important;
      margin-right: 10px;
    }

    label, p {
      margin-bottom: 0!important;
    }
  }
`;

export const DescricaoAtividade = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  strong {
    color: #343a40;
  }

  @media ${ device.tablet } {
    & div:first-child {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

export const ObjetivoAtividade = styled.span`
  height: 24.8px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardBodyInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Nomenclatura = styled.div`
  display: flex;
  flex-direction: row;

  div:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

export const UlHorizontal = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const LiH = styled.li`
  float: left;
`;
