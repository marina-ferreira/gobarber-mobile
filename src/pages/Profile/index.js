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
import ImagePicker from 'react-native-image-picker'

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
  old_password: Yup.string(),
  password: Yup.string().when('old_password', {
    is: val => !!val.length,
    then: Yup.string().required(),
    otherwise: Yup.string()
  }),
  password_confirmation: Yup.string()
    .when('old_password', {
      is: val => !!val.length,
      then: Yup.string().required(),
      otherwise: Yup.string()
    })
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const Profile = () => {
  const { user, updateUser } = useAuth()
  const { goBack } = useNavigation()
  const formRef = useRef(null)
  const emailInputRef = useRef(null)
  const oldPasswordInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const confirmPasswordInputRef = useRef(null)

  const handleProfileUpdate = useCallback(
    async data => {
      formRef.current && formRef.current.setErrors({})

      try {
        await schema.validate(data, { abortEarly: false })

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation
        } = data

        const formData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {})
        }

        const response = await api.put('/profiles', formData)
        updateUser(response.data)

        Alert.alert('Profile updated successfully')

        goBack()
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current && formRef.current.setErrors(errors)
          return
        }

        Alert.alert('Profile update error', 'Profile update failed. Try again.')
      }
    },
    [goBack, updateUser]
  )

  const handleGoBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker({}, response => {
      const { didCancel, error, uri } = response

      if (didCancel) return
      if (error) {
        Alert.alert(`Avatar update error: ${error}`)
        return
      }

      const data = new FormData()

      data.append('avatar', {
        type: 'image/jpg',
        name: `${user.id}.jpg`,
        uri
      })

      api
        .patch('/users/avatar', data)
        .then(payload => updateUser(payload.data))
        .catch(error => console.log(error)) /* eslint-disable-line */
    })
  }, [user.id, updateUser])

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
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>My Profile</Title>
            </View>

            <Form
              ref={formRef}
              initialData={user}
              onSubmit={handleProfileUpdate}
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
