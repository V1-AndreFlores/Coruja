import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #151515;
`;

export const Header = styled.View`
  z-index: 99;
  position: absolute;
  top: 35px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 14px;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  background-color: rgba(21, 21, 21, 0.8);
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 350px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  padding: 8px 14px;
  margin-top: 8px;
`;

export const ContentArea = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 14px;
  justify-content: space-between;
`;

export const Rate = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const ListGenres = styled.FlatList`
  padding-left: 14px;
  margin: 8px 0;
  max-height: 35px;
  min-height: 35px;
`;

export const SubTitle = styled.Text`
  width: 92%;
  padding-left: 15px;
  color: #fff;
  font-size: 14px;
  padding-bottom: 15px;
`;

export const ListNetworks = styled.FlatList`
  padding-left: 14px;
  margin: 8px 0;
  max-height: 35px;
  min-height: 35px;
  margin-top: auto;
`;

export const Description = styled.Text`
  padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 30px;
  color: #fff;
  line-height: 20px;
  text-align: justify;
`;

export const ContainerBannerAdMob = styled.View`
  align-items: center;
  margin-top: auto;
`;
