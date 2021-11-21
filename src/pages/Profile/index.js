import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';

import userFunction from '../../utils/revealFunction';

import {
  Container,
  ProfileContainer,
  Small,
  Item,
  LogoutButton,
} from './styles';

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function logout() {
    dispatch(signOut());
  }

  return (
    <>
      <Container>
        <ProfileContainer>
          <Small>Nome</Small>
          <Item>{profile.nome}</Item>
          <Small>Atuação</Small>
          <Item>{userFunction(profile.atuacoes[0].tipoPerfil)}</Item>
          <Small>Usuário</Small>
          <Item>{profile.usuario}</Item>
          <Small>Email</Small>
          <Item>{profile.email}</Item>
          <LogoutButton onPress={logout}>Desconectar</LogoutButton>
        </ProfileContainer>
      </Container>
    </>
  );
};

export default Profile;
