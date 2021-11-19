import React, { useState, useEffect } from 'react';
import { Image, Dimensions, SafeAreaView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Stars from 'react-native-stars';
import { AdMobBanner } from 'expo-ads-admob';
import { ADMOB_ID } from '@env';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';

import apiTheMovieDB, { keyTheMovieDB } from '../../services/apiTheMovieDB';
import apiRapid, { keyRapid } from '../../services/apiRapid';
import {
  Container,
  Header,
  HeaderButton,
  Title,
  SubTitle,
  ContentArea,
  Rate,
  ListGenres,
  Label,
  ListNetworks,
  Description,
  ContainerBannerAdMob,
} from './styles';
import Loading from '../../components/Loading';
import Genres from '../../components/Genres';
import Networks from '../../components/Networks';
import Cast from '../../components/Cast';
import Significants from '../../components/Significants';
import {
  saveMovie,
  hasMovie,
  deleteMovie,
  saveFavorites,
} from '../../utils/storage';

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movieTMDB, setMovieTMDB] = useState({});
  const [movieRapid, setMovieRapid] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const MIN_HEIGHT = 110;
  const MAX_HEIGHT = 400;

  useEffect(() => {
    const ac = new AbortController();
    let isActive = true;

    async function getRapid() {
      let isResponseError = false;

      const response = await apiRapid
        .get('', {
          params: {
            country: 'br',
            tmdb_id: `${route.params?.type}/${route.params?.id}`,
            output_language: 'en',
          },
          headers: {
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
            'x-rapidapi-key': keyRapid,
          },
        })
        .catch((err) => {
          isResponseError = true;
          // console.log(err);
        });

      if (isActive) {
        if (!isResponseError) {
          setMovieRapid(response.data);
        }

        setLoading(false);
      }
    }

    async function getTMDB() {
      const response = await apiTheMovieDB
        .get(`/${route.params?.type}/${route.params?.id}`, {
          params: {
            api_key: keyTheMovieDB,
            language: 'pt-BR',
          },
        })
        .catch((err) => {
          console.log(err);
        });

      if (isActive) {
        setMovieTMDB(response.data);

        const isFavorite = await hasMovie(response.data);
        setFavorite(isFavorite);

        getRapid();
      }
    }

    if (isActive) {
      getTMDB();
    }

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  async function handleFavoriteMovie(movieTMDB) {
    const key =
      route.params?.type === 'tv' ? 'TotalSavedSeries' : 'TotalSavedMovies';

    if (favorite) {
      await deleteMovie(movieTMDB.id);
      await saveFavorites(key, -1);
      setFavorite(false);
    } else {
      await saveMovie('@coruja', movieTMDB);
      await saveFavorites(key, 1);
      setFavorite(true);
    }
  }

  if (loading) {
    return <Loading />;
  }

  const streamings = JSON.stringify(movieRapid?.streamingInfo);

  const streaming = [
    'apple',
    'disney',
    'hbo',
    'netflix',
    'prime',
    'paramount',
    'hulu',
    'mubi',
    'peacock',
    'showtime',
    'starz',
  ];

  const newStreaming = [];

  for (let i = 0; i < streaming.length; i++) {
    if (streamings != null && streamings.indexOf(streaming[i]) !== -1) {
      newStreaming.push(getStreamingName(streaming[i]));
    }
  }

  function getStreamingName(value) {
    if (value === 'apple') {
      return 'Apple TV';
    }
    if (value === 'disney') {
      return 'Disney+';
    }
    if (value === 'hbo') {
      return 'HBO';
    }
    if (value === 'netflix') {
      return 'Netflix';
    }
    if (value === 'prime') {
      return 'Prime Video';
    }
    if (value === 'paramount') {
      return 'Paramount+';
    }
    if (value === 'hulu') {
      return 'Hulu';
    }
    if (value === 'mubi') {
      return 'Mubi';
    }
    if (value === 'peacock') {
      return 'Peacock';
    }
    if (value === 'showtime') {
      return 'Showtime';
    }
    if (value === 'starz') {
      return 'Starz';
    }
  }

  return (
    <Container>
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.9}
        minOverlayOpacity={0.3}
        fadeOutForeground
        renderHeader={() =>
          movieTMDB?.backdrop_path != null || movieTMDB?.poster_path != null ? (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${
                  movieTMDB?.backdrop_path ?? movieTMDB?.poster_path
                }`,
              }}
              style={{
                height: MAX_HEIGHT,
                width: Dimensions.get('window').width,
                alignSelf: 'stretch',
                resizeMode: 'cover',
              }}
            />
          ) : (
            <Image
              source={require('../../assets/semcartaz.png')}
              style={{
                height: MAX_HEIGHT,
                width: Dimensions.get('window').width,
                alignSelf: 'stretch',
                resizeMode: 'cover',
              }}
            />
          )
        }
        renderFixedForeground={() => (
          <Header>
            <HeaderButton
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={28} color="#fff" />
            </HeaderButton>

            <HeaderButton onPress={() => handleFavoriteMovie(movieTMDB)}>
              {favorite ? (
                <Ionicons name="ios-heart-sharp" size={28} color="#fff" />
              ) : (
                <Ionicons name="ios-heart-outline" size={28} color="#fff" />
              )}
            </HeaderButton>
          </Header>
        )}
      >
        <TriggeringView
          style={{
            backgroundColor: '#151515',
          }}
          onHide={() => this.navTitleView.fadeInUp(300)}
          onDisplay={() => this.navTitleView.fadeOut(100)}
        >
          {route.params?.type === 'tv' ? (
            <Title numberOfLines={2}>{movieTMDB.name}</Title>
          ) : (
            <Title numberOfLines={2}>{movieTMDB.title}</Title>
          )}
        </TriggeringView>

        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#151515',
            paddingBottom: 50,
          }}
        >
          <ContentArea>
            <Stars
              default={movieTMDB.vote_average}
              count={10}
              half
              starSize={20}
              fullStar={<Ionicons name="md-star" size={24} color="#E7A74E" />}
              emptyStar={
                <Ionicons name="md-star-outline" size={24} color="#E7A74E" />
              }
              halfStar={
                <Ionicons name="md-star-half" size={24} color="#E7A74E" />
              }
              disable
            />
            <Rate>{movieTMDB.vote_average}/10</Rate>
          </ContentArea>

          <ListGenres
            data={movieTMDB?.genres}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <Genres data={item} />}
          />

          {movieRapid?.year > 0 ? <Label>Ano {movieRapid?.year}</Label> : null}

          {movieRapid?.age > 0 ? (
            <Label>Classificação {movieRapid?.age}</Label>
          ) : null}

          {route.params?.type === 'tv' ? null : movieTMDB?.runtime > 0 ? (
            <Label>Duração {movieTMDB?.runtime} minutos</Label>
          ) : null}

          {route.params?.type === 'tv' ? (
            <Label>
              {movieTMDB?.number_of_seasons} Temporada
              {movieTMDB?.number_of_seasons > 1 ? 's' : ''}
            </Label>
          ) : null}

          {newStreaming.length > 0 ? (
            <ListNetworks
              data={newStreaming}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => String(item.tmdbID)}
              renderItem={({ item }) => <Networks data={item} />}
            />
          ) : route.params?.type === 'tv' ? (
            <ListNetworks
              data={movieTMDB?.networks}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => <Networks data={item} />}
            />
          ) : null}

          <SubTitle>Descrição</SubTitle>
          <Description>
            {movieTMDB?.overview?.length > 0
              ? movieTMDB?.overview
              : 'Nenhuma descrição disponível neste momento.'}
          </Description>

          <SubTitle>Elenco</SubTitle>
          {movieRapid != null && movieRapid?.cast?.length > 0 ? (
            movieRapid?.cast?.map((item) => (
              <Cast key={item.toString()} data={item} />
            ))
          ) : (
            <Description>Nenhum elenco disponível neste momento.</Description>
          )}

          <SubTitle>Diretor(a)</SubTitle>
          {movieRapid != null && movieRapid?.significants?.length > 0 ? (
            movieRapid?.significants?.map((item) => (
              <Significants key={item.toString()} data={item} />
            ))
          ) : (
            <Description>
              Nenhuma diretor(a) disponível neste momento.
            </Description>
          )}
        </SafeAreaView>
      </ImageHeaderScrollView>

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
