import React from 'react'
import PropTypes from 'prop-types'

import AuthProvider from './AuthProvider'

const AppProvider = ({ children }) => <AuthProvider>{children}</AuthProvider>

export default AppProvider

AppProvider.propTypes = {
  children: PropTypes.element.isRequired
}
