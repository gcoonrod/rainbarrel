'use strict'
const ActionHero = require('actionhero')

module.exports = class ListDevicesAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'listDevices'
    this.description = 'an actionhero action'
    this.outputExample = {}
  }

  async run (data) {
    data.response.devices = await ActionHero.api.models.device.findAll()
  }
}
