import React from 'react';
import { Container, Title } from './styles';

function Significants({ data }) {
  return (
    <Container>
      <Title>{data ?? null}</Title>
    </Container>
  );
}

export default Significants;
