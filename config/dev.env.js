'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://www.easy-mock.com/mock/5cfe84d8c765977517a1d56d/api"',
})
