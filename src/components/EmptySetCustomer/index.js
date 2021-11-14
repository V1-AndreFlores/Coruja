import React from 'react';
import { Container, Title } from './styles';

function EmptySetCustomer() {
  return (
    <Container>
      <Title>Filme ou Série não foi localizado.</Title>
      <Title>
        Por favor, verifique se a escrita está correta e tente novamente.
      </Title>
    </Container>
  );
}

export default EmptySetCustomer;
