'use strict'

exports['default'] = {
  oauth2: (api) => {
    require('dotenv').config()

    return {
      clients: new Map([['fitbit', {
        clientId: process.env.OAUTH2_CLIENT_ID_FITBIT,
        clientSecret: process.env.OAUTH2_CLIENT_SECRET_FITBIT,
        redirectUrl: "http://localhost:8080/api/oauth2/fitbit/callback",
        authUrl: "https://www.fitbit.com/oauth2/authorize",
        tokenUrl: "https://api.fitbit.com/oauth2/token",
        scopes: ['activity','heartrate','location','nutrition','profile','settings','sleep','social','weight']
      }]])
    }
  }
}