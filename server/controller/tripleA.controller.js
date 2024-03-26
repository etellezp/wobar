const {
	getTop10TripleAPlayers,
	getTripleARatings,
	getTripleAPlayerRating
} = require('../model/tripleA.model')

const httpGetTop10TripleAPlayers = async (req, res) => {
	const { year, type } = req.params

	const results = await getTop10TripleAPlayers(year, type)
	res.status(200).json(results)
}

const httpGetTripleARatings = async (req, res) => {
	const { year, type } = req.params

	const results = await getTripleARatings(year, type)
	res.status(200).json(results)
}

const httpGetTripleAPlayerRating = async (req, res) => {
	const { year, type, playerId } = req.params

	const result = await getTripleAPlayerRating(year, type, playerId)
	res.status(200).json(result)
}

module.exports = {
	httpGetTop10TripleAPlayers,
	httpGetTripleARatings,
	httpGetTripleAPlayerRating
}
