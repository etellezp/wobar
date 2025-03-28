// ==== MOBX ====
import { makeAutoObservable } from 'mobx'
// ==== API ====
import { getBatterRatings, getPitcherRatings } from 'src/api/PlayerRatingsApi'
import {
	getTripleABatterRatings,
	getTripleAPitcherRatings
} from 'src/api/TripleA/TripleAPlayerRatingsApi'
import {
	getDoubleABatterRatings,
	getDoubleAPitcherRatings
} from 'src/api/DoubleA/DoubleAPlayerRatingsApi'
import {
	getHighABatterRatings,
	getHighAPitcherRatings
} from 'src/api/HighA/HighAPlayerRatingsApi'
// ==== TYPES ====
import { IPlayer } from 'src/types/MlbTypes'
import type { YearsChoice } from 'src/types/GlobalTypes'

class PlayersStore {
	loadingPlayers: boolean = false
	allBatters: IPlayer[] = []
	allPitchers: IPlayer[] = []
	playerPosition: 'batter' | 'pitcher' = 'batter'
	currentYear: YearsChoice = '2025'
	currentLeague: string = 'mlb'

	constructor() {
		makeAutoObservable(this)
	}

	updatePlayerPosition = (position: 'batter' | 'pitcher') => {
		this.playerPosition = position
	}

	updateCurrentYear = (year: YearsChoice) => {
		this.currentYear = year
	}

	updateCurrentleague = (value: string) => {
		this.currentLeague = value
	}

	setAllBatters = (data: IPlayer[]) => {
		const updateData = data.sort((a, b) => b.rating - a.rating)
		updateData.forEach((item, index) => {
			return (item.rank = index + 1)
		})
		this.allBatters = updateData
	}

	setAllPitchers = (data: IPlayer[]) => {
		const updateData = data.sort((a, b) => b.rating - a.rating)
		updateData.forEach((item, index) => {
			return (item.rank = index + 1)
		})
		this.allPitchers = updateData
	}

	toggleLoadingPlayers = (value: boolean) => {
		this.loadingPlayers = value
	}

	togglePlayerPosition = (position: 'batter' | 'pitcher') => {
		this.updatePlayerPosition(position)
		this.getPlayersData()
	}

	toggleLeague = (value: string) => {
		this.updateCurrentleague(value)
		this.getPlayersData()
	}

	toggleYear = (year: YearsChoice) => {
		this.updateCurrentYear(year)
		this.getPlayersData()
	}

	getPlayersData = () => {
		if (this.playerPosition === 'batter') {
			if (this.currentLeague === 'mlb') {
				this.getAllBatters(this.currentYear)
			} else if (this.currentLeague === 'tripleA') {
				this.getAllTripleABatters(this.currentYear)
			} else if (this.currentLeague === 'doubleA') {
				this.getAllDoubleABatters(this.currentYear)
			} else if (this.currentLeague === 'highA') {
				this.getAllHighABatters(this.currentYear)
			}
		} else {
			if (this.currentLeague === 'mlb') {
				this.getAllPitchers(this.currentYear)
			} else if (this.currentLeague === 'tripleA') {
				this.getAllTripleAPitchers(this.currentYear)
			} else if (this.currentLeague === 'doubleA') {
				this.getAllDoubleAPitchers(this.currentYear)
			} else if (this.currentLeague === 'highA') {
				this.getAllHighAPitchers(this.currentYear)
			}
		}
	}

	getAllBatters = async (year: YearsChoice) => {
		try {
			this.toggleLoadingPlayers(true)
			const response = await getBatterRatings(year)
			this.setAllBatters(response)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingPlayers(false)
		}
	}

	getAllPitchers = async (year: YearsChoice) => {
		try {
			this.toggleLoadingPlayers(true)
			const response = await getPitcherRatings(year)
			this.setAllPitchers(response)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingPlayers(false)
		}
	}

	getAllTripleABatters = async (year: YearsChoice) => {
		try {
			this.toggleLoadingPlayers(true)
			const response = await getTripleABatterRatings(year)
			this.setAllBatters(response)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingPlayers(false)
		}
	}

	getAllTripleAPitchers = async (year: YearsChoice) => {
		try {
			this.toggleLoadingPlayers(true)
			const response = await getTripleAPitcherRatings(year)
			this.setAllPitchers(response)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingPlayers(false)
		}
	}

	getAllDoubleABatters = async (year: YearsChoice) => {
		try {
			this.toggleLoadingPlayers(true)
			const response = await getDoubleABatterRatings(year)
			this.setAllBatters(response)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingPlayers(false)
		}
	}

	getAllDoubleAPitchers = async (year: YearsChoice) => {
		try {
			this.toggleLoadingPlayers(true)
			const response = await getDoubleAPitcherRatings(year)
			this.setAllPitchers(response)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingPlayers(false)
		}
	}

	getAllHighABatters = async (year: YearsChoice) => {
		try {
			this.toggleLoadingPlayers(true)
			const response = await getHighABatterRatings(year)
			this.setAllBatters(response)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingPlayers(false)
		}
	}

	getAllHighAPitchers = async (year: YearsChoice) => {
		try {
			this.toggleLoadingPlayers(true)
			const response = await getHighAPitcherRatings(year)
			this.setAllPitchers(response)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingPlayers(false)
		}
	}
}

export default new PlayersStore()
