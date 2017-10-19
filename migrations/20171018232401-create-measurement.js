'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('measurements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'devices',
          key: 'id'
        }
      },
      metricId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'metrics',
          key: 'id'
        } 
      },
      value: {
        type: Sequelize.FLOAT
      },
      timestamp: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('measurements');
  }
};