const { getDB } = require('../database/db')

const getTop10HighAPlayers = async (year, type) => {
	try {
		const db = getDB()
		const highATop10Ratings = db.collection(`${year}HighA${type}Ratings`)
		const results = await highATop10Ratings
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

const getHighARatings = async (year, type) => {
	try {
		const db = getDB()
		const highARatings = db.collection(`${year}HighA${type}Ratings`)
		const results = await highARatings
			.find({})
			.project({ _id: 0, logs: 0 })
			.toArray()

		return results
	} catch (error) {
		throw new Error('Failed to fetch ratings')
	}
}

const getHighAPlayerRating = async (year, type, playerId) => {
	try {
		const db = getDB()
		const playerRating = db.collection(`${year}HighA${type}Ratings`)
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
	getTop10HighAPlayers,
	getHighARatings,
	getHighAPlayerRating
}
