import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AdMobBanner } from 'expo-ads-admob';
import { ADMOB_ID } from '@env';
import {
  Container,
  ContainerSearch,
  Input,
  ButtonSearch,
  ContainerList,
  ContainerBannerAdMob,
} from './styles';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
import apiTheMovieDB, { keyTheMovieDB } from '../../services/apiTheMovieDB';

function Movies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const navigation = useNavigation();

  let isActive = true;
  async function getMovies() {
    const [popularData] = await Promise.all([
      apiTheMovieDB.get('/movie/now_playing', {
        params: {
          api_key: keyTheMovieDB,
          language: 'pt-BR',
          page: pageNumber,
        },
      }),
    ]);

    if (isActive) {
      setPopularMovies((item) => item.concat(popularData.data.results));
      setLoading(false);
    }
  }

  async function updateList() {
    setPageNumber(pageNumber + 1);
    getMovies();
  }

  useEffect(() => {
    const ac = new AbortController();
    updateList();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  function navigateDetailPage(item) {
    navigation.navigate('Detail', { type: 'movie', id: item.id });
  }

  function handleSearch() {
    if (input === '') return;
    navigation.navigate('Search', { type: 'movie', name: input });
    setInput('');
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let mumberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      mumberOfElementsLastRow !== numColumns &&
      mumberOfElementsLastRow !== 0
    ) {
      mumberOfElementsLastRow += 1;
    }

    return data;
  };

  const numColumns = 3;

  return (
    <Container>
      <Header title="Filmes" />
      <ContainerSearch>
        <Input
          placeholder="Exemplo Free Guy"
          placeholderTextColor="#fff"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <ButtonSearch onPress={handleSearch}>
          <Feather name="corner-down-left" size={30} color="#fff" />
        </ButtonSearch>
      </ContainerSearch>

      <ContainerList>
        <FlatList
          data={formatData(popularMovies, numColumns)}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <SliderItem
              type="movie"
              favorite={false}
              data={item}
              navigatePage={() => navigateDetailPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          onEndReachedThreshold={0.7}
          onEndReached={() => updateList()}
        />
      </ContainerList>

      <ContainerBannerAdMob>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={ADMOB_ID} // Test ID, Replace with your-admob-unit-id
          setTestDeviceIDAsync // true or false
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(err) => console.log(err)}
        />
      </ContainerBannerAdMob>
    </Container>
  );
}

export default Movies;
