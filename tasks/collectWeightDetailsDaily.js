'use strict'
const ActionHero = require('actionhero')
const moment = require('moment')

module.exports = class CollectWeightDetailsDailyTask extends ActionHero.Task {
  constructor () {
    super()
    this.name = 'collectWeightDetailsDaily'
    this.description = 'Collects weight measurements from Fitbit API daily and stores measurements.'
    this.frequency = 86400000
    this.queue = 'default'
    this.middleware = []
  }

  async run (data) {
    const api = ActionHero.api
    const MeasurementModel = api.models.measurement

    const dateString = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const request = await api.fitbit.resources.body.weight.get(dateString)

    api.log(`Collecting weight measurement for ${dateString}.`, 'info', {request})

    if (!Array.isArray(request.weight) || request.weight.length < 1){
      api.log(`No weight data was returned for ${dateString}`, 'info')
      return
    }

    const weightMeasurement = request.weight[0]
    const time = moment(`${weightMeasurement.date} ${weightMeasurement.time}`, 'YYYY-MM-DD HH:mm:ss').valueOf()

    const {weight, bmi, fat} = weightMeasurement

    await MeasurementModel.create({
      deviceId: "7",
      metricId: "3",
      value: weight,
      timestamp: `${time}`
    })

    await MeasurementModel.create({
      deviceId: "7",
      metricId: "4",
      value: bmi,
      timestamp: `${time}`
    })

    await MeasurementModel.create({
      deviceId: "7",
      metricId: "5",
      value: fat,
      timestamp: `${time}`
    })

  }
}
