const { getDB } = require('../database/db')

const getTop10TripleAPlayers = async (year, type) => {
	try {
		const db = getDB()
		const tripleATop10Ratings = db.collection(`${year}TripleA${type}Ratings`)
		const results = await tripleATop10Ratings
			.find({})
			.sort({ rating: -1 })
			.limit(10)
			.project({ _id: 0, logs: 0 })
			.toArray()

		return results
	} catch (error) {
		throw new Error('Failed to fetch top 10 ratings')
	}
}

const getTripleARatings = async (year, type) => {
	try {
		const db = getDB()
		const tripleARatings = db.collection(`${year}TripleA${type}Ratings`)
		const results = await tripleARatings
			.find({})
			.project({ _id: 0, logs: 0 })
			.toArray()

		return results
	} catch (error) {
		throw new Error('Failed to fetch ratings')
	}
}

const getTripleAPlayerRating = async (year, type, playerId) => {
	try {
		const db = getDB()
		const playerRating = db.collection(`${year}TripleA${type}Ratings`)
		const results = await playerRating.findOne(
			{ id: Number(playerId) },
			{ projection: { _id: 0, logs: 0 } }
		)

		return results
	} catch (error) {
		throw new Error('Failed to fetch player rating')
	}
}

module.exports = {
	getTop10TripleAPlayers,
	getTripleARatings,
	getTripleAPlayerRating
}
