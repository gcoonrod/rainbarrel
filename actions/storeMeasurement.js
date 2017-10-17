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
    const MeasurementModel = api.database.models['measurement']
    api.log(`Received raw measurement string [${params.measurement}]`, 'info')

    const measurement = Measurement.decodeRawString(params.measurement)

    response.measurement = await MeasurementModel.create({
      deviceId: measurement.deviceId,
      metricId: measurement.metricId,
      value: measurement.value,
      timestam: measurement.timestamp
    })
  }
}
