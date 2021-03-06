import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 8px;
  border-radius: 10px;
  background: #232129;
  flex-direction: row;
  align-items: center;
  border: 2px solid #232129;

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #c53030;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #ff9000;
    `}
`
export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #fafafa;
`
export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
