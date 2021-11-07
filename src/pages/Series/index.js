import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AdMobBanner } from 'expo-ads-admob';
import { ADMOB_ID } from '@env';
import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  ContainerBannerAdMob,
} from './styles';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
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

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let mumberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      mumberOfElementsLastRow !== numColumns &&
      mumberOfElementsLastRow !== 0
    ) {
      data.push({ id: `blank-${mumberOfElementsLastRow}`, empty: true });
      mumberOfElementsLastRow += 1;
    }

    return data;
  };

  const numColumns = 3;

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerItem}>
          <FlatList
            data={formatData(popularSeries, numColumns)}
            numColumns={numColumns}
            // renderItem={({ item }) => renderItem(item)}
            renderItem={({ item }) => (
              <SliderItem
                type="tv"
                data={item}
                navigatePage={() => navigateDetailPage(item)}
              />
            )}
            keyExtractor={(item) => String(item.id)}
          />
        </View>
      </ScrollView>

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

const styles = StyleSheet.create({
  containerItem: {
    marginLeft: 10,
    alignItems: 'center',
  },
});

export default Series;
