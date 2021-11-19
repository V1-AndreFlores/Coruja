import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  BannerItem,
  Title,
  RateContainer,
  Rate,
  Type,
} from './styles';

function SliderItem({ type, favorite, data, navigatePage }) {
  if (data.empty === true) {
    return null;
  }
  return (
    <Container activeOpacity={0.7} onPress={() => navigatePage(data)}>
      {data.poster_path != null ? (
        <BannerItem
          source={{
            uri: `https://image.tmdb.org/t/p/original${data.poster_path}`,
          }}
        />
      ) : (
        <BannerItem source={require('../../assets/semcartaz.png')} />
      )}
      {type === 'tv' ? (
        <Title numberOfLines={3}>{data?.name}</Title>
      ) : (
        <Title numberOfLines={3}>{data?.title}</Title>
      )}

      {favorite ? (
        <Type>{type === 'tv' ? 'Série' : 'Filme'}</Type>
      ) : (
        <RateContainer>
          <Ionicons name="md-star" size={12} color="#E7A74E" />
          <Rate>{data.vote_average}/10</Rate>
        </RateContainer>
      )}
    </Container>
  );
}

export default SliderItem;
