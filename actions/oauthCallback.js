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
      }
    }
  }

  async run ({params, response, connection}) {
    const api = ActionHero.api;
    api.log('Got callback', 'info', params)

    const fitbitAuth = api.oauth2.clients.fitbit
    const authorization = await fitbitAuth.code.getToken(connection.rawConnection.req.uri)

    response = {
      accessToken: authorization.accessToken,
      refreshToken: authorization.refreshToken
    }
  }
}
