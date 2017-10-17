'use strict'
const ActionHero = require('actionhero')
const Sequelize = require('sequelize')

const Device = require('../classes/device')

const modelClasses = [
  Device
]

module.exports = class DatabaseInitializer extends ActionHero.Initializer {
  constructor () {
    super()
    this.name = 'database'
    this.loadPriority = 1000
    this.startPriority = 1000
    this.stopPriority = 1000
  }

  async initialize () {
    const api = ActionHero.api
    
    api.database = {
      connection: new Sequelize({
        host: 'localhost',
        dialect: 'sqlite',
        pool: {
          max: 5,
          min: 0,
          idle: 1000
        },
        storage: `${__dirname}/../database.sqlite`
      }),
      models: {}
    }
  }

  async start () {
    const database = ActionHero.api.database
    const api = ActionHero.api
    await database.connection.authenticate()
    api.log('Connected to database', 'info')
    modelClasses.forEach(async modelClass => {
      const {name, columns} = modelClass.modelDefinition()
      const model = await database.connection.define(name, columns)
      await model.sync()
      database.models[name] = model
      api.log(`Defined model [${name}]`)
    })
  }
  async stop () {}
}
