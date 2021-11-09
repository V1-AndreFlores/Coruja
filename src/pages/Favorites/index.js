import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { AdMobBanner } from 'expo-ads-admob';
import { ADMOB_ID } from '@env';
import { Container, ContainerList, ContainerBannerAdMob } from './styles';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import { getMoviesSave } from '../../utils/storage';

function Favorites() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getFavorites() {
      const result = await getMoviesSave('@coruja');

      if (isActive) {
        setFavorites(result);
        setLoading(false);
      }
    }

    getFavorites();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, [isFocused]);

  function navigateDetailPage(item) {
    navigation.navigate('Detail', {
      type: item?.title != null ? 'movie' : 'tv',
      id: item.id,
    });
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
      <Header title="Favoritos" />

      <ContainerList>
        <FlatList
          data={formatData(favorites, numColumns)}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <SliderItem
              type={item?.title != null ? 'movie' : 'tv'}
              favorite
              data={item}
              navigatePage={() => navigateDetailPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
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

export default Favorites;
