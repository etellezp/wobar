import axios from 'axios'
//https://wobar-api.onrender.com
export const getHighABatterRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/highA-ratings/${year}/Batter`
	)
	return response ? response.data : []
}

export const getHighAPitcherRatings = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/highA-ratings/${year}/Pitcher`
	)
	return response ? response.data : []
}
