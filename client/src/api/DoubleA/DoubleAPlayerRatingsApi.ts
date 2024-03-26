import axios from 'axios'

export const getDoubleABatterRatings = async (year: string) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/doubleARatings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getDoubleAPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/doubleARatings/${year}/Pitcher`
	)
	return response ? response.data : []
}
