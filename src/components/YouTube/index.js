import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Container } from './styles';

function YouTube({ data }) {
  return (
    <Container>
      <YoutubePlayer height={300} play={false} videoId={data} />
    </Container>
  );
}

export default YouTube;
