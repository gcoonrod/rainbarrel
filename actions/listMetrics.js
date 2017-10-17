'use strict'
const ActionHero = require('actionhero')

module.exports = class ListMetricsAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'listMetrics'
    this.description = 'an actionhero action'
    this.outputExample = {}
  }

  async run (data) {
    data.response.metrics = await ActionHero.api.database.models['metric'].findAll()
  }
}
