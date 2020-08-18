import React from 'react'
import { render } from 'react-native-testing-library'
import SignIn from '../../pages/SignIn'

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn()
  }
})

describe('renders correctly', () => {
  it('renders correctly', () => {
    const { getByPlaceholder } = render(<SignIn />)

    expect(getByPlaceholder('Email')).toBeTruthy()
    expect(getByPlaceholder('Password')).toBeTruthy()
  })
})
