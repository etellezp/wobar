import axios from 'axios'

export const getBatterRatings = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/mlb-ratings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/mlb-ratings/${year}/Pitcher`
	)
	return response ? response.data : []
}

export const getPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/mlb-ratings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}

export const getTripleAPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/tripleA-ratings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}

export const getDoubleAPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/doubleA-ratings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}

export const getHighAPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/highA-ratings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}
