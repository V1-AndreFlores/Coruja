import React from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import {
  Container,
  Title,
  RateContainer,
  Rate,
  ActionContainer,
  DetailButton,
  DeleteButton,
} from './styles';

function FavoriteItem({ data, deleteMovie, navigatePage }) {
  return (
    <Container>
      <Title size={22}>{data?.title ?? data?.name}</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74E" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>

      <ActionContainer>
        <DetailButton onPress={() => navigatePage(data)}>
          <Title size={14}>Ver Detalhes</Title>
        </DetailButton>

        <DeleteButton onPress={() => deleteMovie(data.id)}>
          <Feather name="trash" size={24} color="#fff" />
        </DeleteButton>
      </ActionContainer>
    </Container>
  );
}

export default FavoriteItem;
