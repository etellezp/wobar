const {
	getTop10DoubleAPlayers,
	getDoubleARatings,
	getDoubleAPlayerRating
} = require('../model/doubleA.model')

const httpGetTop10DoubleAPlayers = async (req, res) => {
	const { year, type } = req.params

	const results = await getTop10DoubleAPlayers(year, type)
	res.status(200).json(results)
}

const httpGetDoubleARatings = async (req, res) => {
	const { year, type } = req.params

	const results = await getDoubleARatings(year, type)
	res.status(200).json(results)
}

const httpGetDoubleAPlayerRating = async (req, res) => {
	const { year, type, playerId } = req.params

	const result = await getDoubleAPlayerRating(year, type, playerId)
	res.status(200).json(result)
}

module.exports = {
	httpGetTop10DoubleAPlayers,
	httpGetDoubleARatings,
	httpGetDoubleAPlayerRating
}
