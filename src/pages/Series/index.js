import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  SliderSerie,
} from './styles';
import Header from '../../components/Header';
import SliderItemx from '../../components/SliderItemx';
import api, { key } from '../../services/api';

function Series() {
  const [popularSeries, setPopularSeries] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getSeries() {
      const [popularData] = await Promise.all([
        api.get('/tv/popular', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),
      ]);

      if (isActive) {
        setPopularSeries(popularData.data.results);
        setLoading(false);
      }
    }

    getSeries();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  function navigateDetailPage(item) {
    navigation.navigate('Detail', { type: 'tv', id: item.id });
  }

  function handleSearch() {
    if (input === '') return;
    navigation.navigate('Search', { type: 'tv', name: input });
    setInput('');
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="Séries" />
      <SearchContainer>
        <Input
          placeholder="Exemplo Loki"
          placeholderTextColor="#fff"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <SearchButton onPress={handleSearch}>
          <Feather name="corner-down-left" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>
      <SliderSerie
        vertical
        showsVerticalScrollIndicator={false}
        data={popularSeries}
        renderItem={({ item }) => (
          <SliderItemx
            type="tv"
            data={item}
            navigatePage={() => navigateDetailPage(item)}
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </Container>
  );
}

export default Series;
