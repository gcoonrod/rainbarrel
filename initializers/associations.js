'use strict'
const ActionHero = require('actionhero')

module.exports = class AssociationsInitializer extends ActionHero.Initializer {
  constructor () {
    super()
    this.name = 'associations'
    this.loadPriority = 1000
    this.startPriority = 1002
    this.stopPriority = 1000
  }

  async initialize () {}

  async start () {
    for(const model of Object.values(ActionHero.api.models)){
      if(typeof model.associate === 'function'){
        await model.associate(ActionHero.api.models)
      }
    }
  }
  async stop () {}
}
