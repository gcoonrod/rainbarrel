'use strict'
const ActionHero = require('actionhero')
const moment = require('moment')

module.exports = class MyAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'checkWeight'
    this.description = 'an actionhero action'
    this.outputExample = {}
  }

  async run (data) {
    const api = ActionHero.api
    const dateString = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const request = await api.fitbit.resources.body.weight.get(dateString)
    
    data.response.weight = request.weight
  }
}
