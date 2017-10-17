'use strict'
const Sequelize = require('sequelize')

module.exports = class Device {
  constructor({name, id, ipAddress}){
    this.name = name
    this.id = id
    this.ipAddress = ipAddress
  }

  static modelDefinition(){
    return {
      name: 'device',
      columns: {
        name: Sequelize.STRING,
        id: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        ipAddress: Sequelize.STRING
      }
    }
  }
}