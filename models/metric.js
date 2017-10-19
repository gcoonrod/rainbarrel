'use strict';
module.exports = (sequelize, DataTypes) => {
  var metric = sequelize.define('metric', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true
    },
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return metric;
};