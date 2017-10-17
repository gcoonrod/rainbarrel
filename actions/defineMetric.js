'use strict'
const ActionHero = require('actionhero')
const Metric = require('../classes/metric')

module.exports = class DefineMetricAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'defineMetric'
    this.description = 'Define a new Metric'
    this.outputExample = {},
    this.inputs = {
      id: {
        required: true
      },
      description: {
        default: () => "Metric"
      },
      name: {
        default: () => "Metric"
      },
      unit: {
        required: true
      }
    }
  }

  async run ({params, response}) {
    const api = ActionHero.api;
    api.log(`Defining a new metric ${params.id}, named ${params.name}.`, 'info')

    response.metric = new Metric({
      id: params.id,
      description: params.description,
      name: params.name,
      unit: params.unit
    })
  }
}
