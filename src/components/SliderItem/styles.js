import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin-top: 10px;
  margin-right: 10px;
  width: 105px;
  height: 255px;
  background-color: #333333;
`;

export const BannerItem = styled.Image`
  width: 100%;
  height: 170px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 14px;
  padding-top: 8px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #333333;
`;

export const RateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #333333;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  margin-top: auto;
`;

export const Rate = styled.Text`
  padding-left: 4px;
  color: #fff;
  font-size: 12px;
`;

export const Type = styled.Text`
  color: #fff;
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  margin-top: auto;
`;
