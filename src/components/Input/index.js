import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'

import { Container, TextInput, Icon } from './styles'

const Input = ({ name, icon, ...rest }, ref) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef({ value: defaultValue })
  const inputElementRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    }
  }))

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      }
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      <TextInput
        ref={inputElementRef}
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

export default forwardRef(Input)

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}
