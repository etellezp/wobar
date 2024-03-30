const {
	getTop10HighAPlayers,
	getHighARatings,
	getHighAPlayerRating
} = require('../model/highA.model')

const httpGetTop10HighAPlayers = async (req, res) => {
	const { year, type } = req.params

	const results = await getTop10HighAPlayers(year, type)
	res.status(200).json(results)
}

const httpGetHighARatings = async (req, res) => {
	const { year, type } = req.params

	const results = await getHighARatings(year, type)
	res.status(200).json(results)
}

const httpGetHighAPlayerRating = async (req, res) => {
	const { year, type, playerId } = req.params

	const result = await getHighAPlayerRating(year, type, playerId)
	res.status(200).json(result)
}

module.exports = {
	httpGetTop10HighAPlayers,
	httpGetHighARatings,
	httpGetHighAPlayerRating
}
