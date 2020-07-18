import React from 'react'
import { View, Text, StatusBar } from 'react-native'

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Text style={{ fontSize: 200 }}>Hello</Text>
      </View>
    </>
  )
}

export default App
