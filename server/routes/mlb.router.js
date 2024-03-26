const express = require('express')
const {
  httpGetTop10MlbPlayers,
  httpGetMlbRatings,
  httpGetMlbPlayerRating
} = require('../controller/mlb.controller')

const mlbRouter = express.Router()

mlbRouter.get('/:year/top10/:type', httpGetTop10MlbPlayers)
mlbRouter.get('/:year/:type', httpGetMlbRatings)
mlbRouter.get('/:year/:type/:playerId', httpGetMlbPlayerRating)

module.exports = mlbRouter
