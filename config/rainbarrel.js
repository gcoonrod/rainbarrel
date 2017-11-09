'use strict'

exports['default'] = {
  rainbarrel: (api) => {
    return {
      devices: {
        // IoT Sensor 010 - 099
        omega2: {
          id: '010',
          name: 'omega2',
          ipAddress: '127.0.0.1'
        },

        // API Services 100 - 199
        fitbit: {
          id: '100',
          name: 'fitbit',
          ipAddress: '127.0.0.1'
        }
      },
      metrics: {
        // Environmental Metrics 010 - 099
        temperature: {
          id: '010',
          name: 'Temperature',
          unit: 'F',
          description: 'Ambient air temperature in degrees Fahrenheit'
        },
        humidity: {
          id: '011',
          name: 'Relative Humidity',
          unit: '%',
          description: 'Ratio of the partial pressure of water vapor to the equilibrium vapor pressure of water at a given temperature'
        },
        pressure: {
          id: '012',
          name: 'Air Pressure',
          unit: 'psi',
          description: 'Ambient air pressure in pounds per square inch'
        },

        // Personal Health Metrics 100 - 199
        weight: {
          id: '100',
          name: 'Weight',
          unit: 'lbs',
          description: 'Personal body weight in pounds'
        },
        fat: {
          id: '101',
          name: 'Body Fat',
          unit: '%',
          description: 'Percent Body Fat'
        },
        bmi: {
          id: '102',
          name: 'BMI',
          unit: 'kg/m^2',
          description: 'Body Mass Index'
        }
      }
    }
  }
}