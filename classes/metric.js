'use strict';
const api = require('actionhero').api

module.exports = class Metric {
  constructor({name, measurement}){
    this.description = 'Basic Metric'
    this.name = name
    this.measurement = measurement
  }

  static decodeMetricString(metricString){
    api.log("notice", "METRIC DECODE")
    api.log("notice", metricString)
    let parts = metricString.split('|')
    api.log("notice", parts)
    let metric = new Metric({name: parts[0], measurement: parts[1]})
    metric.value = parts[2]
    metric.id = parts[3]
    return metric
  }

  getMetricString(id, value){
    return `${name}|${measurement}|${value}|${id}`
  }
}