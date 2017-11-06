'use strict'
const ActionHero = require('actionhero')
const superagent = require('superagent')

module.exports = class FitbitAPIInitializer extends ActionHero.Initializer {
  constructor () {
    super()
    this.name = 'fitbit'
    this.loadPriority = 1000
    this.startPriority = 1000
    this.stopPriority = 1000
  }

  async initialize () {
    const api = ActionHero.api
    api.fitbit = {}

    api.fitbit.baseUrl = 'https://api.fitbit.com/1/user/-'
    api.fitbit.resources = {
      activities: {
        url: '/activities',
        get: async (dateString) => {
          //TODO return http request result
          const token = await api.models.token.findById('fitbit')
          const response = await superagent
            .get(api.fitbit.baseUrl + api.fitbit.resources.activities.url + `/date/${dateString}.json`)
            .set('Authorization', `Bearer ${token.accessToken}`)
            .type('application/json')
            .accept('application/json')

          return response.body
        }
      },
      body: {
        url: '/body/log',
        weight: {
          url: '/weight',
          get: async (dateString) => {
            const token = await api.models.token.findById('fitbit')
            const url = api.fitbit.baseUrl + api.fitbit.resources.body.url + api.fitbit.resources.body.weight.url + `/date/${dateString}.json`
            const response = await superagent.get(url)
              .set('Authorization', `Bearer ${token.accessToken}`)
              .type('application/json')
              .accept('application/json')

            return response.body
          }
        }
      }
    }
  }

  async start () {}
  async stop () {}
}
