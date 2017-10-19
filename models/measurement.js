'use strict';
module.exports = (sequelize, DataTypes) => {
  var measurement = sequelize.define('measurement', {
    value: DataTypes.FLOAT,
    timestamp: DataTypes.STRING,
    deviceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'device',
        key: 'id'
      }
    },
    metricId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'metric',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    updatedAt: false
  });

  measurement.associate = function(models){
    this.belongsTo(models.device, {foreignKey: "deviceId"})
    this.belongsTo(models.metric, {foreignKey: "metricId"})
  }
  return measurement;
};