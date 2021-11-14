import React from 'react';
import { Container, Title } from './styles';

function Cast({ data }) {
  return (
    <Container>
      <Title>{data ?? null}</Title>
    </Container>
  );
}

export default Cast;
