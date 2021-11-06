import React from 'react';
import { Container, Name } from './styles';

function Networks({ data }) {
  return (
    <Container>
      <Name>{data.name}</Name>
    </Container>
  );
}

export default Networks;
