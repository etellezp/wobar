import axios from 'axios'

export const getDoubleATopTenBatters = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/doubleA-ratings/${year}/top10/Batter`
	)
	return response ? response.data : []
}

export const getDoubleATopTenPitchers = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/doubleA-ratings/${year}/top10/Pitcher`
	)
	return response ? response.data : []
}
