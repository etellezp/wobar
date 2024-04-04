import axios from 'axios'

export const getHighATopTenBatters = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/highA-ratings/${year}/top10/Batter`
	)
	return response ? response.data : []
}

export const getHighATopTenPitchers = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/highA-ratings/${year}/top10/Pitcher`
	)
	return response ? response.data : []
}
