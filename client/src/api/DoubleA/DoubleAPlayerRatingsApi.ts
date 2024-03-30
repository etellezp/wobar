import axios from 'axios'
//https://wobar-api.onrender.com
export const getDoubleABatterRatings = async (year: string) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/doubleA-ratings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getDoubleAPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/doubleA-ratings/${year}/Pitcher`
	)
	return response ? response.data : []
}
