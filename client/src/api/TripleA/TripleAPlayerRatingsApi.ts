import axios from 'axios'

export const getTripleABatterRatings = async (year: string) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/tripleARatings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getTripleAPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/tripleARatings/${year}/Pitcher`
	)
	return response ? response.data : []
}
