import axios from 'axios'

export const getTripleABatterRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/tripleARatings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getTripleAPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/tripleARatings/${year}/Pitcher`
	)
	return response ? response.data : []
}
