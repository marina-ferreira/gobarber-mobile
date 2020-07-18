import React from 'react'
import { Image } from 'react-native'

import logo from 'assets/logo.png'
import { Container, Title } from './styles'

const SignIn = () => {
  return (
    <Container>
      <Image source={logo} />

      <Title>Sign In</Title>
    </Container>
  )
}

export default SignIn
