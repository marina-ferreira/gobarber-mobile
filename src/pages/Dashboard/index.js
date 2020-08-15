import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

import api from 'services/api'
import { useAuth } from 'hooks'

import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserName,
  UserAvatar,
  ProviderListTitle,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText
} from './styles'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const { navigate } = useNavigation()

  const [providers, setProviders] = useState([])

  useEffect(() => {
    api
      .get('/providers')
      .then(({ data }) => setProviders(data))
      .catch(error => console.log(error)) /* eslint-disable-line */
  }, [])

  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  const navigateToCreateAppointment = useCallback(
    providerId => {
      navigate('CreateAppointment', { providerId })
    },
    [navigate]
  )

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Welcome, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={item => item?.id}
        ListHeaderComponent={
          <ProviderListTitle>Hair Stylists</ProviderListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url || '' }} />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Monday to Friday</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8am to 17pm</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />

      <Button title="Sair" onPress={signOut} />
    </Container>
  )
}

export default Dashboard
