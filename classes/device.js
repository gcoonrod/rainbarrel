'use strict'

module.exports = class Device {
  constructor({name, id, ipAddress}){
    this.name = name
    this.id = id
    this.ipAddress = ipAddress
  }
}