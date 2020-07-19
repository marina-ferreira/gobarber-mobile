const getValidationErrors = errors => {
  const validationErrors = {}

  errors.inner.forEach(error => {
    const { path, message } = error
    validationErrors[path] = message
  })

  return validationErrors
}

export default getValidationErrors
