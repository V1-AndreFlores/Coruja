import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AdMobBanner } from 'expo-ads-admob';
import { ADMOB_ID } from '@env';
import { Container, ListMovies, ContainerBannerAdMob } from './styles';
import SearchItem from '../../components/SearchItem';
import api, { key } from '../../services/api';

function Search() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function getSearchMovie() {
      const response = await api.get(`/search/${route?.params?.type}`, {
        params: {
          query: route?.params?.name,
          api_key: key,
          language: 'pt-BR',
          page: 1,
        },
      });

      if (isActive) {
        setMovie(response.data.results);
        setLoading(false);
      }
    }

    if (isActive) {
      getSearchMovie();
    }

    return () => {
      isActive = false;
    };
  }, []);

  function navigateDetailsPage(item) {
    navigation.navigate('Detail', { type: route?.params?.type, id: item.id });
  }

  if (loading) {
    return <Container />;
  }

  return (
    <Container>
      <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SearchItem
            type={route?.params?.type}
            data={item}
            navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />

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

export default Search;
