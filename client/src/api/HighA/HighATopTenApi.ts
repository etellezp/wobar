import axios from 'axios'

export const getHighATopTenBatters = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/highA-ratings/${year}/top10/Batter`
	)
	return response ? response.data : []
}

export const getHighATopTenPitchers = async (year: string) => {
	const response = await axios.get(
		`http://localhost:8000/highA-ratings/${year}/top10/Pitcher`
	)
	return response ? response.data : []
}
