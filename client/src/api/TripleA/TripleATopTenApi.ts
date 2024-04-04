import axios from 'axios'

export const getTripleATopTenBatters = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/tripleA-ratings/${year}/top10/Batter`
	)
	return response ? response.data : []
}

export const getTripleATopTenPitchers = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/tripleA-ratings/${year}/top10/Pitcher`
	)
	return response ? response.data : []
}
