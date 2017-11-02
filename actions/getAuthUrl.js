'use strict'
const ActionHero = require('actionhero')

module.exports = class GetAuthUrlAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'getAuthUrl'
    this.description = 'an actionhero action'
    this.outputExample = {
      url: 'https://example.com/oauth2/authorize'
    },
    this.inputs = {
      client: {
        required: true,
        validator: param => typeof param === 'string'
      }
    }
  }

  async run (data) {
    const api = ActionHero.api
    const client = api.oauth2.clients[data.params.client];
    if (client === undefined) {
      data.response.error = new Error(`Client for ${data.params.client} not found!`)
    } else {
      data.response.url = client.code.getUri()
    }
  }
}
