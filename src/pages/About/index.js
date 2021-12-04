import React from 'react';
import { AdMobBanner } from 'expo-ads-admob';
import { ADMOB_ID } from '@env';
import {
  Container,
  ContainerLogo,
  Logo,
  Description,
  ContainerBannerAdMob,
} from './styles';
import Header from '../../components/Header';
import logo from '../../assets/logo.png';

function Series() {
  return (
    <Container>
      <Header title="Sobre" />
      <ContainerLogo>
        <Logo source={logo} style={{ width: 100, height: 153 }} />
      </ContainerLogo>
      <Description>
        Com o crescimento dos streamings de filmes e séries no Brasil e também
        com seus conteúdos exclusivos, a dificuldade de encontrar o que queremos
        assistir está ficando cada vez mais difícil.
      </Description>
      <Description>
        Esse aplicativo foi criado com o propósito de facilitar isso, muitas
        vezes me encontrei procurando um filme ou seriado especifico em todos os
        streamings que tenho assinatura para descobrir que ele não constava.
      </Description>
      <Description>
        Nesta primeira versão é possível encontramos filmes e séries nos
        seguintes streamings: Apple TV, Disney+, HBO, Netflix, Paramount+, Prime
        Video, entre outros.
      </Description>

      {/*
       <ContainerBannerAdMob>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={ADMOB_ID} // Test ID, Replace with your-admob-unit-id
          setTestDeviceIDAsync={false} // true or false
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(err) => console.log(err)}
        />
      </ContainerBannerAdMob>
       */}
    </Container>
  );
}

export default Series;
