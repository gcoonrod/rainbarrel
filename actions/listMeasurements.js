'use strict'
const ActionHero = require('actionhero')

module.exports = class ListMeasurementsAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'listMeasurements'
    this.description = 'an actionhero action'
    this.outputExample = {}
  }

  async run (data) {
    data.response.measurements = await ActionHero.api.database.models['measurement'].findAll()
  }
}
