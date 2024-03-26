const express = require('express')
const {
	httpGetTop10TripleAPlayers,
	httpGetTripleARatings,
	httpGetTripleAPlayerRating
} = require('../controller/tripleA.controller')

const tripleA = express.Router()

tripleA.get('/:year/top10/:type', httpGetTop10TripleAPlayers)
tripleA.get('/:year/:type', httpGetTripleARatings)
tripleA.get('/:year/:type/:playerId', httpGetTripleAPlayerRating)

module.exports = tripleA
