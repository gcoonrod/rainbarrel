'use strict'

module.exports = class Metric {
  constructor({id, name, unit, description}){
    this.id = id
    this.description = description
    this.name = name
    this.unit = unit
  }
}