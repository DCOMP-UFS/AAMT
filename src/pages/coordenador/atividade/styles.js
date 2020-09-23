import styled from 'styled-components';

export const ContainerCiclo = styled.div`
  display: flex;
  align-items: center;
`;

export const ContainerAtividade = styled.article`
  .card-atividade {
    cursor: pointer;
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
