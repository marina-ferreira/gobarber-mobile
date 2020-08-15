import React, { useCallback } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from 'hooks'

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar
} from './styles'

const CreateAppointment = () => {
  const { user } = useAuth()
  const { goBack } = useNavigation()
  const route = useRoute()
  const { providerId } = route.params

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Hair Stylists</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </Container>
  )
}

export default CreateAppointment
