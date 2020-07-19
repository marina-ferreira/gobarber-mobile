import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'

import api from 'services/api'

import { AuthContext } from 'contexts'

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStorageData = async () => {
      const [[, user], [, token]] = await AsyncStorage.multiGet([
        '@GoBarber:user',
        '@GoBarber:token'
      ])
      user && token && setAuthData({ user: JSON.parse(user), token })

      setLoading(false)
    }

    loadStorageData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password })
    const { token, user } = response.data

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)]
    ])

    setAuthData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

    setAuthData({})
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
}
