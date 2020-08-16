import styled from 'styled-components'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
`
export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #28262e;
`
export const Content = styled.ScrollView``
export const BackButton = styled.TouchableOpacity``
export const HeaderTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;
  margin-left: 16px;
`
export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`
export const ProvidersListContainer = styled.View`
  height: 112px;
`
export const ProvidersList = styled.FlatList`
  padding: 32px 24px;
`
export const ProviderContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
  background: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
`
export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`
export const ProviderName = styled.Text`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`
export const Calendar = styled.View``
export const Title = styled.Text`
  margin: 0 24px 24px;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #f4ede8;
`
export const OpenDatePickerButton = styled(RectButton)`
  height: 44px;
  margin: 0 24px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #ff9000;
`
export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`
export const Schedule = styled.View`
  padding: 24px 0 16px;
`
export const Section = styled.View`
  margin-bottom: 24px;
`
export const SectionTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #999591;
  margin: 0 24px 12px;
`
export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false
})``
export const Hour = styled(RectButton)`
  padding: 12px;
  margin-right: 8px;
  border-radius: 10px;
  opacity: ${({ available }) => (available ? 1 : 0.3)};
  background: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
`
export const HourText = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`
export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  margin: 0 24px 24px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #ff9000;
`
export const CreateAppointmentButtonTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #232129;
`
