import React from 'react'
import PropTypes from 'prop-types'

import { Container, TextInput } from './styles'

const Input = ({ name, icon, ...rest }) => (
  <Container>
    <TextInput
      placeholderTextColor="#666360"
      keyboardAppearance="dark"
      {...rest}
    />
  </Container>
)

export default Input

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}
