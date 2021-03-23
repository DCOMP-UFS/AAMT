import styled from 'styled-components';

export const Pontos = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  .ponto {
    width: 15px;
    height: 15px;
    background: #198ae3;
    border-radius: 50%;
    margin-left: 10px;

    animation: onda 1s ease-in-out infinite alternate;
  }

  .ponto:nth-child( 1 ) {
    animation-delay: -0.4s;
  }

  .ponto:nth-child( 2 ) {
    animation-delay: -0.2s;
  }

  @keyframes onda {
    from {
      transform: translateY( -100% );
    }
    to {
      transform: translateY( 100% );
    }
  }
`;
