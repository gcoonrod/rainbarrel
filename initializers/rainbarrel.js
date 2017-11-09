'use strict'
const ActionHero = require('actionhero')

module.exports = class RainbarrelInitializer extends ActionHero.Initializer {
  constructor () {
    super()
    this.name = 'rainbarrel'
    this.startPriority = 1100
  }

  async start () {
    const api = ActionHero.api
    const {devices, metrics} = api.config.rainbarrel
    const DeviceModel = api.models.device
    const MetricModel = api.models.metric

    for (let key in devices) {
      api.log(`Ensuring device ${key} is registered.`, 'info')
      await DeviceModel.upsert(devices[key])
    }

    for (let key in metrics) {
      api.log(`Ensuring metric ${key} is registered`, 'info')
      await MetricModel.upsert(metrics[key])
    }
  }
}
