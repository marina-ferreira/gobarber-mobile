import React, { useCallback } from 'react'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from 'hooks'

import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserName,
  UserAvatar
} from './styles'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const { navigate } = useNavigation()

  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

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

      <Button title="Sair" onPress={signOut} />
    </Container>
  )
}

export default Dashboard
