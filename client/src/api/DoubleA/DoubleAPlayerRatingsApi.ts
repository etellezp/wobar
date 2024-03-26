import axios from 'axios'

export const getDoubleABatterRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/doubleARatings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getDoubleAPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/doubleARatings/${year}/Pitcher`
	)
	return response ? response.data : []
}
