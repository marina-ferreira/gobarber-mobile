import React from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import Input from 'components/Input'
import Button from 'components/Button'

import logo from 'assets/logo.png'
import { Container, Title, BackToSignIn, BackToSignInText } from './styles'

const SignUp = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logo} />

            <View>
              <Title>Create an account</Title>
            </View>

            <Input name="name" icon="user" placeholder="Name" />
            <Input name="email" icon="mail" placeholder="Email" />
            <Input name="password" icon="lock" placeholder="Password" />

            <Button>Sign Up</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn>
        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <BackToSignInText>Back to sign in</BackToSignInText>
      </BackToSignIn>
    </>
  )
}

export default SignUp
