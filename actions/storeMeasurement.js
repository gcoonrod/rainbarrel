'use strict'
const ActionHero = require('actionhero')
const Metric = require('../classes/metric')
const Measurement = require('../classes/measurement')

module.exports = class StoreMeasurementAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'storeMeasurement'
    this.description = 'Stores a new measurement'
    this.outputExample = {}
    this.inputs = {
      measurement: {
        required: true,
        validator: param => {return typeof param === 'string'}
      }
    }
  }

  async run ({params, response}) {
    const api = ActionHero.api
    api.log(`Received raw measurement string [${params.measurement}]`, 'info')

    response.measurement = Measurement.decodeRawString(params.measurement)
  }
}
