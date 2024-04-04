import axios from 'axios'

export const getHighABatterRatings = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/highA-ratings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getHighAPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/highA-ratings/${year}/Pitcher`
	)
	return response ? response.data : []
}
