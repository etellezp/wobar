import axios from 'axios'

export const getHighABatterRatings = async (year: string) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/highA-ratings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getHighAPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/highA-ratings/${year}/Pitcher`
	)
	return response ? response.data : []
}
