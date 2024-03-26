const { getDB } = require('../database/db')

const getTop10MlbPlayers = async (year, type) => {
  try {
    const db = getDB()
    const mlbTop10Ratings = db.collection(`${year}Mlb${type}Ratings`)
    const results = await mlbTop10Ratings
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

const getMlbRatings = async (year, type) => {
  try {
    const db = getDB()
    const mlbRatings = db.collection(`${year}Mlb${type}Ratings`)
    const results = await mlbRatings
      .find({})
      .project({ _id: 0, logs: 0 })
      .toArray()

    return results
  } catch (error) {
    throw new Error('Failed to fetch ratings')
  }
}

const getMlbPlayerRating = async (year, type, playerId) => {
  try {
    const db = getDB()
    const playerRating = db.collection(`${year}Mlb${type}Ratings`)
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
  getTop10MlbPlayers,
  getMlbRatings,
  getMlbPlayerRating
}
