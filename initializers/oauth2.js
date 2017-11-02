'use strict'
const ActionHero = require('actionhero')
const Oauth2Client = require('client-oauth2')
const https = require('https')

module.exports = class Oauth2Initializer extends ActionHero.Initializer {
  constructor () {
    super()
    this.name = 'oauth2'
    this.loadPriority = 1000
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
        redirectUri: settings.redirectUrl,
        scopes: settings.scopes
      })
    }

    ActionHero.api.log(`Oauth2 Client initialization complete. Loaded ${clients.size} clients.`, 'info')
  }
}
