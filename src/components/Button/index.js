import React from 'react'
import PropTypes from 'prop-types'

import { Container, ButtonText } from './styles'

const Button = ({ children }) => {
  return (
    <Container>
      <ButtonText>{children}</ButtonText>
    </Container>
  )
}

export default Button

Button.propTypes = {
  children: PropTypes.string.isRequired
}
