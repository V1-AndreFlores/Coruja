import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  ContainerLoading,
  ContainerHorizontal,
  ContainerLogo,
  Logo,
  TitleLoading,
} from './styles';
import logo from '../../assets/logo.png';

function Loading() {
  return (
    <ContainerLoading>
      <ContainerLogo>
        <Logo source={logo} style={{ width: 100, height: 153 }} />
      </ContainerLogo>
      <ContainerHorizontal>
        <ActivityIndicator size="large" color="#fff" />
      </ContainerHorizontal>
      <TitleLoading>
        Por favor aguarde, estamos buscando as informações!
      </TitleLoading>
    </ContainerLoading>
  );
}

export default Loading;
