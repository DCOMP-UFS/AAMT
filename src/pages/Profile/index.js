import React from 'react';
import {View, StatusBar, TouchableWithoutFeedback} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {signOut} from '../../store/modules/auth/actions';

import api from '../../services/api';

import userFunction from '../../utils/revealFunction';

import {Container, ProfileContainer, Small, Item, LogoutButton} from './styles';

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function logout() {
    dispatch(signOut());
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        <ProfileContainer>
          <Small>Nome</Small>
          <Item>{profile.user.nome}</Item>
          <Small>Atuação</Small>
          <Item>{userFunction(profile.user.atuacoes[0].tipoPerfil)}</Item>
          <Small>Usuário</Small>
          <Item>{profile.user.usuario}</Item>
          <Small>Email</Small>
          <Item>{profile.user.email}</Item>
        </ProfileContainer>
        <TouchableWithoutFeedback onPress={logout}>
          <LogoutButton>Desconectar</LogoutButton>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
};

export default Profile;
