import React, { useState, useEffect } from 'react';
import {
  BannerButton,
  Container,
  BannerImage,
  Title,
  SubTitle,
  InfoContainer,
  ListGenres,
  ListNetworks,
} from './styles';
import api, { key } from '../../services/api';
import Genres from '../Genres';
import Networks from '../Networks';

function SliderItemx({ type, data, navigatePage }) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    let isActive = true;

    async function getInfo() {
      const response = await api
        .get(`/${type}/${data?.id}`, {
          params: {
            api_key: key,
            language: 'pt-BR',
          },
        })
        .catch((err) => {
          console.log(err);
        });

      if (isActive) {
        setInfo(response.data);
      }
    }

    if (isActive) {
      getInfo();
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <BannerButton activeOpacity={0.7} onPress={() => navigatePage(data)}>
      <Container>
        <BannerImage
          source={{
            uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
          }}
        />

        <InfoContainer>
          {type === 'tv' ? (
            <Title numberOfLines={2}>{data?.name}</Title>
          ) : (
            <Title numberOfLines={2}>{data?.title}</Title>
          )}

          {info?.genres?.length > 0 ? (
            <ListGenres
              data={info?.genres}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => <Genres data={item} />}
            />
          ) : null}

          {type === 'tv' && info?.number_of_seasons != null ? (
            <SubTitle>
              {info?.number_of_seasons} Temporada
              {info?.number_of_seasons > 1 ? 's' : ''}
            </SubTitle>
          ) : null}

          <ListNetworks
            data={info?.networks}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <Networks data={item} />}
          />
        </InfoContainer>
      </Container>
    </BannerButton>
  );
}

export default SliderItemx;
