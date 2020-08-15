import React, { useState, useEffect, useCallback } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

import api from 'services/api'
import { useAuth } from 'hooks'

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName
} from './styles'

const CreateAppointment = () => {
  const { user } = useAuth()
  const { goBack } = useNavigation()
  const route = useRoute()
  const { providerId } = route.params
  const [providers, setProviders] = useState([])
  const [selectedProvider, setSelectedProvider] = useState(providerId)

  useEffect(() => {
    api
      .get('/providers')
      .then(({ data }) => setProviders(data))
      .catch(error => console.log(error)) /* eslint-disable-line */
  }, [])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback(id => {
    setSelectedProvider(id)
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Hair Stylists</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={item => item?.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={selectedProvider === provider.id}
              onPress={() => handleSelectProvider(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url || '' }} />
              <ProviderName selected={selectedProvider === provider.id}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
    </Container>
  )
}

export default CreateAppointment
