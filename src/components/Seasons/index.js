import React from 'react';
import { Container, Title } from './styles';

function Seasons({ data }) {
  return (
    <Container>
      <Title>
        {`${data?.name} - ${data?.episode_count} ${
          data?.episode_count > 1 ? 'Episódios' : 'Episódio'
        }` ?? null}
      </Title>
    </Container>
  );
}

export default Seasons;
