import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'

import { Container, TextInput, Icon } from './styles'

const Input = ({ name, icon, ...rest }) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef({ value: defaultValue })

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      <TextInput
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        {...rest}
      />
    </Container>
  )
}

export default Input

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}
