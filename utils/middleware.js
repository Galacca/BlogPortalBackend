const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
        next()
      return null
    }
    next()
    return null
    
  }

  const error = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint.' })
  }

  module.exports = {
      tokenExtractor,
      error
  }