import axios from 'axios'

export const getBatterRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/mlbRatings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/mlbRatings/${year}/Pitcher`
	)
	return response ? response.data : []
}

export const getPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`http://localhost:8000/mlbRatings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}

export const getTripleAPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`http://localhost:8000/tripleARatings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}

export const getDoubleAPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`http://localhost:8000/doubleARatings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}
