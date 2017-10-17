exports['default'] = {
  database: api => {
    return {
      logging: {
        level: process.env.NODE_ENV === 'production' ? 'debug' : 'info'
      }
    }
  }
}