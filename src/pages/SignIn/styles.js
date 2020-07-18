import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  justify-content: center;
  align-items: center;
`
export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`
export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`
export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  margin: 64px 0 24px;
`
export const CreateAccountButton = styled.TouchableOpacity`
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 0 ${getBottomSpace()}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
`
export const CreateAccountButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #ff9000;
  margin-left: 16px;
`
