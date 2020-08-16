import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'

import { Container, TextInput, Icon } from './styles'

const Input = ({ name, icon, containerStyle, ...rest }, ref) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef({ value: defaultValue })
  const inputElementRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputValueRef.current.value)
  }, [])

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
    <Container isFocused={isFocused} isErrored={!!error} style={containerStyle}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />

      <TextInput
        ref={inputElementRef}
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
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
  icon: PropTypes.string.isRequired,
  containerStyle: PropTypes.string
}

Input.defaultProps = {
  containerStyle: {}
}
