'use strict';
module.exports = (sequelize, DataTypes) => {
  var device = sequelize.define('device', {
    name: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true
    },
    ipAddress: DataTypes.STRING
  });
  return device;
};