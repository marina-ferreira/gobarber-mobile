import React, { useRef, useCallback } from 'react'
import {
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
import api from 'services/api'
import { useAuth } from 'hooks'

import Input from 'components/Input'
import Button from 'components/Button'

import {
  Container,
  BackButton,
  Title,
  UserAvatarButton,
  UserAvatar
} from './styles'

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().min(6)
})

const Profile = () => {
  const { user } = useAuth()
  const { navigate, goBack } = useNavigation()
  const formRef = useRef(null)
  const emailInputRef = useRef(null)
  const oldPasswordInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const confirmPasswordInputRef = useRef(null)

  const handleSignUp = useCallback(
    async data => {
      formRef.current && formRef.current.setErrors({})

      try {
        await schema.validate(data, { abortEarly: false })
        await api.post('/users', data)

        Alert.alert('Sign in successful', 'You can sign in now')

        navigate('SignIn')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current && formRef.current.setErrors(errors)
          return
        }

        Alert.alert(
          'Authentication Error',
          'Sign up failed. Invalid credentials.'
        )
      }
    },
    [navigate]
  )

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

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
            <BackButton onPress={navigateBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>My Profile</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
              style={{ width: '100%' }}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Name"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="Email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />

              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Current Password"
                textContentType="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                containerStyle={{ marginTop: 16 }}
                secureTextEntry
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Password"
                textContentType="none"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                secureTextEntry
              />

              <Input
                ref={confirmPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirm Password"
                textContentType="none"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                secureTextEntry
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Save
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default Profile
