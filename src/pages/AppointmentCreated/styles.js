import styled from 'styled-components'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  justify-content: center;
  align-items: center;
`
export const Title = styled.Text`
  max-width: 250px;
  font-family: 'RobotoSlab-Medium';
  font-size: 32px;
  color: #f4ede8;
  margin-top: 48px;
  text-align: center;
`
export const Description = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #999591;
  text-align: center;
  margin: 24px 0 0;
`
export const OkButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 32px;
  padding: 12px 24px;
  background: #ff9000;
`
export const OkButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #312e38;
`
