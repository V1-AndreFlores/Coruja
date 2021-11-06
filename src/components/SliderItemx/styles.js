import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: 180px;
  margin-bottom: 15px;
  background-color: #333333;
`;

export const BannerButton = styled.TouchableOpacity``;

export const BannerImage = styled.Image`
  width: 120px;
  height: 180px;
`;

export const InfoContainer = styled.View`
  width: auto;
  min-width: 242px;
  max-width: 242px;
`;

export const Title = styled.Text`
  width: 92%;
  color: #fff;
  font-weight: bold;
  padding-left: 14px;
  font-size: 16px;
  margin-top: 8px;
`;

export const SubTitle = styled.Text`
  width: 92%;
  color: #fff;
  padding-left: 14px;
  font-size: 14px;
  margin-top: 4px;
`;

export const ListGenres = styled.FlatList`
  padding-left: 14px;
  margin-top: 4px;
  min-height: 35px;
  max-height: 35px;
`;

export const ListNetworks = styled.FlatList`
  padding-left: 14px;
  margin-bottom: 10px;
  min-height: 35px;
  max-height: 35px;
  margin-top: auto;
`;
