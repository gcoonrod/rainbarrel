'use strict'
const Sequelize = require('sequelize')

module.exports = class Measurement {
  constructor({deviceId, metricId, timestamp, value}){
    this.deviceId = deviceId
    this.metricId = metricId
    this.timestamp = timestamp
    this.value = value
  }

  static decodeRawString(rawString){
    let parts = rawString.split('|')
    validateParts(parts)

    if(parts[2] === 'time'){
      parts[2] = Date.now()
    }

    let options = {
      deviceId: parts[0],
      metricId: parts[1],
      timestamp: parts[2],
      value: parseFloat(parts[3])
    }
    return new Measurement(options)
  }
}

function validateParts(parts) {
  if(parts.length !== 4) {
    throw new Error(`Measurement string invalid! Expected 4 parts but found ${parts.length}.`)
  }
}