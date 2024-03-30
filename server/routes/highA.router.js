const express = require('express')
const {
	httpGetTop10HighAPlayers,
	httpGetHighARatings,
	httpGetHighAPlayerRating
} = require('../controller/highA.controller')

const highA = express.Router()

highA.get('/:year/top10/:type', httpGetTop10HighAPlayers)
highA.get('/:year/:type/:playerId', httpGetHighAPlayerRating)
highA.get('/:year/:type', httpGetHighARatings)

module.exports = highA
