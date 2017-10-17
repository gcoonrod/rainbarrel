'use strict'
const Sequelize = require('sequelize')

module.exports = class Metric {
  constructor({id, name, unit, description}){
    this.id = id
    this.description = description
    this.name = name
    this.unit = unit
  }

  static modelDefinition(){
    return {
      name: 'metric',
      columns: {
        name: Sequelize.STRING,
        id: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        unit: Sequelize.STRING,
        description: Sequelize.TEXT
      }
    }
  }
}