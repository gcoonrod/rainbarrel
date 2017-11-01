'use strict'
const ActionHero = require('actionhero')
const Oauth2Client = require('client-oauth2')
const https = require('https')

module.exports = class Oauth2Initializer extends ActionHero.Initializer {
  constructor () {
    super()
    this.name = 'oauth2'
    this.loadPriority = 1000,
    this.startPriority = 1000
  }

  async initialize () {
    ActionHero.api['oauth2'] = {
      clients: {}
    }

    ActionHero.api.log('Initializing Oauth2 Clients...', 'info')
    const clients = ActionHero.api.config.oauth2.clients;
    for (const [client, settings] of clients.entries()) {
      ActionHero.api.log(`Initializing Oauth2 Client for ${client}`, 'info')
      ActionHero.api.oauth2.clients[client] = new Oauth2Client({
        clientId: settings.clientId,
        clientSecret: settings.clientSecret,
        accessTokenUri: settings.tokenUrl,
        authorizationUri: settings.authUrl,
        redirectUri: ActionHero.api.config.oauth2.redirectUrl,
        scopes: settings.scopes
      })
    }

    ActionHero.api.log(`Oauth2 Client initialization complete. Loaded ${clients.size} clients.`, 'info')
  }

  async start() {
    const api = ActionHero.api
    const fitbitAuth = api.oauth2.clients.fitbit

    const uri = fitbitAuth.code.getUri()
    api.log('uri: ', 'info', uri)
    const flow = await Oauth2Initializer.doOauthFlow(uri)
    api.log('flow', 'info', flow)
  }

  static doOauthFlow(uri){
    return new Promise((resolve, reject) => {
      https.get(uri, (response) => {
        response.on('data', data => resolve(data))
      })
      .on('error', error => reject(error))
    })
  }
}
