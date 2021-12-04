import React from 'react';
import Constants from 'expo-constants';
import { Container, TextVersion } from './styles';

function Version() {
  return (
    <Container>
      <TextVersion>Versão {Constants.manifest.version}</TextVersion>
    </Container>
  );
}

export default Version;
