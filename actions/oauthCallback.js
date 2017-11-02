'use strict'
const ActionHero = require('actionhero')

module.exports = class Oauth2CallbackAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'oauthCallback'
    this.description = 'an actionhero action'
    this.outputExample = {},
    this.inputs = {
      code: {
        required: true
      },
      clientId: {
        required: true
      }
    }
  }

  async run (data) {
    const api = ActionHero.api;
    const client = api.oauth2.clients[data.params.clientId]
    const TokenModel = api.models.token

    if (client === undefined) {
      data.connection.rawConnection.responseHttpCode = 404
      data.connection.sendFile('oauth/404.html')
      data.toRender = false
      return
    }

    try {
      const authorization = await client.code.getToken(data.connection.rawConnection.req.uri)
      
      api.log('Authorization: ', 'debug', authorization.data)

      let tokenResult = await TokenModel.upsert({
        service: data.params.clientId,
        accessToken: authorization.data.access_token,
        refreshToken: authorization.data.refresh_token
      })

      api.log('Oauth token writen to database.', 'debug', tokenResult)
      
      data.connection.sendFile('oauth/success.html')
      data.toRender = false
    } catch (error) {
      api.log('Error getting Oauth token!', 'error', error)
      data.connection.rawConnection.responseHttpCode = 400
      data.connection.sendFile('oauth/failure.html')
      data.toRender = false
    }
  }
}
