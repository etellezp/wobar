import axios from 'axios'

export const getBatterRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/mlb-ratings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/mlb-ratings/${year}/Pitcher`
	)
	return response ? response.data : []
}

export const getPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`http://localhost:8000/mlb-ratings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}

export const getTripleAPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`http://localhost:8000/tripleA-ratings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}

export const getDoubleAPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`http://localhost:8000/doubleA-ratings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}

export const getHighAPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`http://localhost:8000/highA-ratings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}
