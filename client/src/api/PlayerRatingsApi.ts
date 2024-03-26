import axios from 'axios'

export const getBatterRatings = async (year: string) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/mlbRatings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/mlbRatings/${year}/Pitcher`
	)
	return response ? response.data : []
}

export const getPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/mlbRatings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}

export const getTripleAPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/tripleARatings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}

export const getDoubleAPlayerRating = async (
	year: string,
	position: 'Batter' | 'Pitcher',
	id: string | undefined
) => {
	const response = await axios.get(
		`https://wobar-api.onrender.com/doubleARatings/${year}/${position}/${id}`
	)

	return response ? response.data : {}
}
