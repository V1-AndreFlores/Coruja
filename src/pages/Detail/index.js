import React, { useState, useEffect } from 'react';
import { ScrollView, Modal } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Stars from 'react-native-stars';
import { AdMobBanner } from 'expo-ads-admob';
import { ADMOB_ID } from '@env';
import api, { key } from '../../services/api';
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  SubTitle,
  ListNetworks,
  Description,
  ContainerBannerAdMob,
} from './styles';
import Genres from '../../components/Genres';
import Networks from '../../components/Networks';
import ModalLink from '../../components/ModalLink';
import { saveMovie, hasMovie, deleteMovie } from '../../utils/storage';

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api
        .get(`/${route.params?.type}/${route.params?.id}`, {
          params: {
            api_key: key,
            language: 'pt-BR',
          },
        })
        .catch((err) => {
          console.log(err);
        });

      if (isActive) {
        setMovie(response.data);

        const isFavorite = await hasMovie(response.data);
        setFavorite(isFavorite);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    };
  }, []);

  async function handleFavoriteMovie(movie) {
    if (favorite) {
      await deleteMovie(movie.id);
      setFavorite(false);
    } else {
      await saveMovie('@primereact', movie);
      setFavorite(true);
    }
  }

  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#fff" />
        </HeaderButton>

        <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
          {favorite ? (
            <Ionicons name="ios-heart-sharp" size={28} color="#fff" />
          ) : (
            <Ionicons name="ios-heart-outline" size={28} color="#fff" />
          )}
        </HeaderButton>
      </Header>

      <Banner
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
      />

      {route.params?.type === 'tv' ? (
        <Title numberOfLines={2}>{movie.name}</Title>
      ) : (
        <Title numberOfLines={2}>{movie.title}</Title>
      )}

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#E7A74E" />}
          emptyStar={
            <Ionicons name="md-star-outline" size={24} color="#E7A74E" />
          }
          halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74E" />}
          disable
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGenres
        data={movie?.genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
      />

      {route.params?.type === 'tv' ? (
        <SubTitle>
          {movie?.number_of_seasons} Temporada
          {movie?.number_of_seasons > 1 ? 's' : ''}
        </SubTitle>
      ) : null}

      {route.params?.type === 'tv' ? (
        <ListNetworks
          data={movie?.networks}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Networks data={item} />}
        />
      ) : null}

      <Title>Descrição</Title>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Description>
          {movie?.overview?.length > 0
            ? movie?.overview
            : 'Nenhuma descrição disponível neste momento.'}
        </Description>
      </ScrollView>

      <Modal animationType="slide" transparent visible={openLink}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>

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

export default Detail;
