'use strict'

module.exports = class Metric {
  constructor({id, name, unit, description}){
    this.id = id
    this.description = description
    this.name = name
    this.unit = unit
  }

  static decodeMetricString(metricString){
    let parts = metricString.split('|')
    let metric = new Metric({name: parts[0], measurement: parts[1]})
    metric.value = parts[2]
    metric.id = parts[3]
    return metric
  }

  getMetricString(id, value){
    return `${name}|${measurement}|${value}|${id}`
  }
}