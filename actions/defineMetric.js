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
    const MetricModel = api.database.models['metric']
    api.log(`Defining a new metric ${params.id}, named ${params.name}.`, 'info')

    response.metric = await MetricModel.create({
      id: params.id,
      name: params.name,
      description: params.description,
      unit: params.unit
    })
  }
}
