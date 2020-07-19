import React, { useCallback, useRef } from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import getValidationErrors from 'utils/getValidationErrors'
import { useAuth } from 'hooks'

import Input from 'components/Input'
import Button from 'components/Button'

import logo from 'assets/logo.png'
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles'

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required()
})

const SignIn = () => {
  const navigation = useNavigation()
  const formRef = useRef(null)
  const passwordInputRef = useRef(null)
  const { signIn } = useAuth()

  const handleSignIn = useCallback(
    async data => {
      formRef.current?.setErrors({})

      try {
        await schema.validate(data, {
          abortEarly: false
        })

        await signIn(data)
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current && formRef.current.setErrors(errors)
          return
        }

        Alert.alert(
          'Authentication Error',
          'Sign in failed. Invalid credentials.'
        )
      }
    },
    [signIn]
  )

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
              <Title>Sign In</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignIn}
              style={{ width: '100%' }}
            >
              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Sign In
              </Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText>Forgot password</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Create an account</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}

export default SignIn
