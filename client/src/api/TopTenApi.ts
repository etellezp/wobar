import axios from 'axios'

export const getTopTenBatters = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/mlb-ratings/${year}/top10/Batter`
	)
	return response ? response.data : []
}

export const getTopTenPitchers = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/mlb-ratings/${year}/top10/Pitcher`
	)
	return response ? response.data : []
}
