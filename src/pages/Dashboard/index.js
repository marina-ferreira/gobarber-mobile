import React from 'react'
import { View, Button } from 'react-native'

import { useAuth } from 'hooks'

const Dashboard = () => {
  const { signOut } = useAuth()

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 30 }}>
      <Button title="Sair" onPress={signOut} />
    </View>
  )
}

export default Dashboard
