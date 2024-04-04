import axios from 'axios'

export const getTripleABatterRatings = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/tripleA-ratings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getTripleAPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/tripleA-ratings/${year}/Pitcher`
	)
	return response ? response.data : []
}
