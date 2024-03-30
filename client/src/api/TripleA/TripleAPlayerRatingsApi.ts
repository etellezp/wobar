import axios from 'axios'

export const getTripleABatterRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/tripleA-ratings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getTripleAPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/tripleA-ratings/${year}/Pitcher`
	)
	return response ? response.data : []
}
