import React from 'react'
import { Image } from 'react-native'

import Input from 'components/Input'
import Button from 'components/Button'

import logo from 'assets/logo.png'
import { Container, Title } from './styles'

const SignIn = () => {
  return (
    <Container>
      <Image source={logo} />

      <Title>Sign In</Title>

      <Input name="email" icon="mail" placeholder="Email" />
      <Input name="password" icon="lock" placeholder="Password" />

      <Button>Sign In</Button>
    </Container>
  )
}

export default SignIn
