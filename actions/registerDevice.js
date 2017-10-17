'use strict'
const ActionHero = require('actionhero')
const Device = require('../classes/device')

module.exports = class RegisterDeviceAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'registerDevice'
    this.description = 'Register a new Metric device'
    this.outputExample = {},
    this.inputs = {
      deviceId: {
        required: true,
        validator: isString
      },
      name: {
        validator: isString,
        default: () => {return `Device-${Date.now()}`}
      },
      ipAddress: {
        validator: isString,
        default: (param, connection) => {return connection.remoteIP || '0.0.0.0'}
      }
    }
  }

  async run ({params, response}) {
    const api = ActionHero.api
    api.log(`Registering device: ${params.deviceId}`, 'info')
    response.device = new Device({
      name: params.name,
      id: params.deviceId,
      ipAddress: params.ipAddress
    })
  }
}

function isString(input){
  return typeof input === 'string'
}
