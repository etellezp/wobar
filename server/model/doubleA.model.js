const { getDB } = require('../database/db')

const getTop10DoubleAPlayers = async (year, type) => {
	try {
		const db = getDB()
		const doubleATop10Ratings = db.collection(`${year}DoubleA${type}Ratings`)
		const results = await doubleATop10Ratings
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

const getDoubleARatings = async (year, type) => {
	try {
		const db = getDB()
		const doubleARatings = db.collection(`${year}DoubleA${type}Ratings`)
		const results = await doubleARatings
			.find({})
			.project({ _id: 0, logs: 0 })
			.toArray()

		return results
	} catch (error) {
		throw new Error('Failed to fetch ratings')
	}
}

const getDoubleAPlayerRating = async (year, type, playerId) => {
	try {
		const db = getDB()
		const playerRating = db.collection(`${year}DoubleA${type}Ratings`)
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
	getTop10DoubleAPlayers,
	getDoubleARatings,
	getDoubleAPlayerRating
}
