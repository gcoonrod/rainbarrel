'use strict'
const ActionHero = require('actionhero')
const api = require('actionhero').api
const Metric = require('../classes/metric')

module.exports = class MyAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'storeMetric'
    this.description = 'an actionhero action'
    this.outputExample = {}
    this.inputs = {
      metric: {
        required: true,
        validator: param => {
          const partCount = param.split('|').length
          if(partCount != 4){
            throw new Error('invalid metric')
          }
        }
      }
    }
  }

  async run (data) {
    try {
      const metric = Metric.decodeMetricString(data.params.metric)
      data.response.metric = "metric"
      api.log('info', `Metric ${metric}`)
    } catch (error) {
      data.error = error
    }
  }
}
