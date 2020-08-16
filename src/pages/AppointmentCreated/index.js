import React, { useCallback, useMemo } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'

import { Container, Title, Description, OkButton, OkButtonText } from './styles'

const AppointmentCreated = () => {
  const { reset } = useNavigation()
  const { params } = useRoute()

  const handleOk = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0
    })
  }, [reset])

  const formattedDate = useMemo(() => {
    return format(params.date, "EEEE',' MMMM do 'at' HH:mm")
  }, [params.date])

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Appointment scheduled</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOk}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  )
}

export default AppointmentCreated
