import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ContainerLoading, ContainerHorizontal, TitleLoading } from './styles';

function Loading() {
  return (
    <ContainerLoading>
      <ContainerHorizontal>
        <ActivityIndicator size="large" color="#fff" />
      </ContainerHorizontal>
      <TitleLoading>
        Por favor aguarde, estamos buscando as informações
      </TitleLoading>
    </ContainerLoading>
  );
}

export default Loading;
