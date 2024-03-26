const {
	getTop10MlbPlayers,
	getMlbRatings,
	getMlbPlayerRating
} = require('../model/mlb.model')

const httpGetTop10MlbPlayers = async (req, res) => {
	const { year, type } = req.params

	const results = await getTop10MlbPlayers(year, type)
	return res.status(200).json(results)
}

const httpGetMlbRatings = async (req, res) => {
	const { year, type } = req.params

	const results = await getMlbRatings(year, type)
	res.status(200).json(results)
}

const httpGetMlbPlayerRating = async (req, res) => {
	const { year, type, playerId } = req.params

	const result = await getMlbPlayerRating(year, type, playerId)
	res.status(200).json(result)
}

module.exports = {
	httpGetTop10MlbPlayers,
	httpGetMlbRatings,
	httpGetMlbPlayerRating
}
