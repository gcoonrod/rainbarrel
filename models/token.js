'use strict'
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    service: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  })
  return token
}