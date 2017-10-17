'use strict'
const ActionHero = require('actionhero')
const Sequelize = require('sequelize')

const Device = require('../classes/device')
const Metric = require('../classes/metric')
const Measurement = require('../classes/measurement')

const modelClasses = [
  Device, Metric, Measurement
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
        storage: `${__dirname}/../database.sqlite`,
        logging: (sql, time) => {
          api.log(`[DATABASE] ${sql}`, api.config.database.logging.level)
        }
      }),
      models: {}
    }
  }

  async start () {
    const database = ActionHero.api.database
    const api = ActionHero.api
    await database.connection.authenticate()
    api.log('Connected to database', 'info')

    // let modelsDefined = modelClasses.map(async modelClass => {
    //   const {name, columns} = modelClass.modelDefinition()
    //   const model = await database.connection.define(name, columns)
    //   await model.sync()
    //   database.models[name] = model
    //   api.log(`Defined model [${name}]`)
    // })

    // await Promise.all(modelsDefined)

    for (const modelClass of modelClasses){
      const {name, columns} = modelClass.modelDefinition()
      const model = await database.connection.define(name, columns)
      await model.sync()
      database.models[name] = model
      api.log(`Defined model [${name}]`)
    }

    await database.models['measurement'].belongsTo(database.models['device'], {foreignKey: 'deviceId'})
    await database.models['measurement'].belongsTo(database.models['metric'], {foreignKey: 'metricId'})

    await database.models['measurement'].sync({force: true})

  }
  async stop () {}
}
