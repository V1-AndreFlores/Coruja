import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #151515;
  flex: 1;
  padding: 4px 0;
`;

export const ContainerSearch = styled.View`
  flex-direction: row;
  width: 100%;
  height: 50px;
  align-items: center;
  padding: 0 14px;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.4);
  width: 85%;
  height: 50px;
  border-radius: 10px;
  padding: 8px 15px;
  font-size: 18px;
  color: #fff;
`;

export const ButtonSearch = styled.TouchableOpacity`
  width: 15%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  padding-top: 20px;
  padding-bottom: 8px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  padding-left: 14px;
  padding-right: 14px;
`;

export const BannerButton = styled.TouchableOpacity``;

export const Banner = styled.Image`
  height: 150px;
  border-radius: 6px;
  margin: 0 14px;
`;

export const ContainerList = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

export const ContainerBannerAdMob = styled.View`
  align-items: center;
  margin-top: auto;
`;
