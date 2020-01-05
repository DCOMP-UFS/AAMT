import styled from 'styled-components';
import { Color } from '../../styles/global';

export const ContainerLab = styled.div`
  background: #181824;
  font-family: "nunito-semibold", sans-serif;
  padding: 0;
  position: fixed;
  top: 0;
  left: ${ props => props.collapse ? "-330px" : "0" };
  min-height: 100vh;
  width: 330px;

  transition: all 0.5s ease-out;
`;

export const ContainerButtonMenu = styled.div`
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
`;

export const ContainerArrowBack = styled.div`
  padding: 10px;
  width: 100%;
  text-align: right;
`;

export const PerfilUser = styled.div`
  margin-top: -38px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const Photo = styled.div`
  border-radius: 50%;
  border: 3px solid ${ Color.dark };
  background: ${ Color.muted };
  margin-bottom: 30px;

  img {
    width: 150px;
    border-radius: 50%;
  }
`;

export const ContainerAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: ${ Color.dark };
  padding-right: 15px;
  margin-bottom: 30px;
  border-radius: 22px 0 0 22px;

  span {
    margin-left: 15px;
  }
`;

export const Search = styled.div`
  margin: auto;
  width: calc(100% - 40px);
`;

export const Logout = styled.div`
  position: absolute;
  bottom: 15px;
  text-align: center;
  width: 100%;
`;
