const express = require('express')
const {
	httpGetTop10DoubleAPlayers,
	httpGetDoubleARatings,
	httpGetDoubleAPlayerRating
} = require('../controller/doubleA.controller')

const doubleA = express.Router()

doubleA.get('/:year/top10/:type', httpGetTop10DoubleAPlayers)
doubleA.get('/:year/:type', httpGetDoubleARatings)
doubleA.get('/:year/:type/:playerId', httpGetDoubleAPlayerRating)

module.exports = doubleA
