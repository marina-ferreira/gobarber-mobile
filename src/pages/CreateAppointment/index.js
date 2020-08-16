import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Platform } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'

import api from 'services/api'
import { useAuth } from 'hooks'

import {
  Container,
  Header,
  Content,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText
} from './styles'

const CreateAppointment = () => {
  const { user } = useAuth()
  const { goBack } = useNavigation()
  const route = useRoute()
  const { providerId } = route.params
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(0)
  const [availability, setAvailability] = useState([])
  const [providers, setProviders] = useState([])
  const [selectedProvider, setSelectedProvider] = useState(providerId)

  useEffect(() => {
    api
      .get('/providers')
      .then(({ data }) => setProviders(data))
      .catch(error => console.log(error)) /* eslint-disable-line */
  }, [])

  useEffect(() => {
    const params = {
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
      day: selectedDate.getDate()
    }

    api
      .get(`/providers/${selectedProvider}/day-availability`, { params })
      .then(({ data }) => setAvailability(data))
      .catch(error => console.log(error)) /* eslint-disable-line */
  }, [selectedDate, selectedProvider])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback(id => {
    setSelectedProvider(id)
  }, [])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [])

  const handleDateChange = useCallback((e, date) => {
    if (Platform.OS === 'android') setShowDatePicker(false)

    date && setSelectedDate(date)
  }, [])

  const handleSelectHour = useCallback(hour => {
    setSelectedHour(hour)
  }, [])

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00')
      }))
  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00')
      }))
  }, [availability])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Hair Stylists</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={item => item?.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                selected={selectedProvider === provider.id}
                onPress={() => handleSelectProvider(provider.id)}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url || '' }} />
                <ProviderName selected={selectedProvider === provider.id}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Pick the date</Title>

          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Select other date
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              maode="date"
              display="calendar"
              textColor="#f4ede8"
              value={selectedDate}
              onChange={handleDateChange}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Pick the time</Title>

          <Section>
            <SectionTitle>Morning</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hour, formattedHour, available }) => (
                <Hour
                  key={formattedHour}
                  enabled={available}
                  available={available}
                  selected={selectedHour === hour}
                  onPress={() => handleSelectHour(hour)}
                >
                  <HourText selected={selectedHour === hour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Afternoon</SectionTitle>

            <SectionContent>
              {afternoonAvailability.map(
                ({ hour, formattedHour, available }) => (
                  <Hour
                    key={formattedHour}
                    enabled={available}
                    available={available}
                    selected={selectedHour === hour}
                    onPress={() => handleSelectHour(hour)}
                  >
                    <HourText selected={selectedHour === hour}>
                      {formattedHour}
                    </HourText>
                  </Hour>
                )
              )}
            </SectionContent>
          </Section>
        </Schedule>
      </Content>
    </Container>
  )
}

export default CreateAppointment
