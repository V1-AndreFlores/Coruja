import React, { useState, useEffect } from 'react';
import { getFavoritesSave } from '../../utils/storage';
import {
  Container,
  Title,
  ContainerTotal,
  ContainerTotalType,
  TextNumber,
  TextLabel,
} from './styles';

function FavoritesTotal() {
  const [totalSavedMovies, setTotalSavedMovies] = useState('0');
  const [totalSavedSeries, setTotalSavedSeries] = useState('0');

  async function getTotalSavedMovies() {
    const result = await getFavoritesSave('TotalSavedMovies');
    setTotalSavedMovies(result);
  }

  async function getTotalSavedSeries() {
    const result = await getFavoritesSave('TotalSavedSeries');
    setTotalSavedSeries(result);
  }

  function goDown() {
    const num = 1;
    if (num > 0) {
      setTimeout(() => {
        getTotalSavedMovies();
        getTotalSavedSeries();
        goDown();
      }, 1000);
    }
  }

  useEffect(() => {
    goDown();
  }, []);

  return (
    <Container>
      <Title>Favoritados</Title>

      <ContainerTotal>
        <ContainerTotalType>
          <TextNumber>{totalSavedMovies}</TextNumber>
        </ContainerTotalType>
        <ContainerTotalType>
          <TextNumber>{totalSavedSeries}</TextNumber>
        </ContainerTotalType>
      </ContainerTotal>

      <ContainerTotal>
        <ContainerTotalType>
          <TextLabel>Filmes</TextLabel>
        </ContainerTotalType>
        <ContainerTotalType>
          <TextLabel>Séries</TextLabel>
        </ContainerTotalType>
      </ContainerTotal>
    </Container>
  );
}

export default FavoritesTotal;
