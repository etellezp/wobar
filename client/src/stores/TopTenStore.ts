// ==== MOBX ====
import { makeAutoObservable } from 'mobx'
// ==== API ====
import { getTopTenBatters, getTopTenPitchers } from 'src/api/TopTenApi'
import {
	getTripleATopTenBatters,
	getTripleATopTenPitchers
} from 'src/api/TripleA/TripleATopTenApi'
import {
	getDoubleATopTenBatters,
	getDoubleATopTenPitchers
} from 'src/api/DoubleA/DoubleATopTenApi'
import {
	getHighATopTenBatters,
	getHighATopTenPitchers
} from 'src/api/HighA/HighATopTenApi'
// ==== TYPES ====
import { IPlayer } from 'src/types/MlbTypes'
import type { YearsChoice } from 'src/types/GlobalTypes'

class TopTenStore {
	loadingTopTen: boolean = false
	batterTopTen: IPlayer[] = []
	pitcherTopTen: IPlayer[] = []
	currentYear: YearsChoice = '2025'
	topTenLeague: string = 'mlb'

	constructor() {
		makeAutoObservable(this)
	}

	toggleLoadingTopTen = (value: boolean) => {
		this.loadingTopTen = value
	}

	setBatterTopTen = (data: IPlayer[]) => {
		this.batterTopTen = data
	}

	setPitcherTopTen = (data: IPlayer[]) => {
		this.pitcherTopTen = data
	}

	setCurrentYear = (year: YearsChoice) => {
		this.currentYear = year
	}

	setTopTenYear = (year: YearsChoice) => {
		this.setCurrentYear(year)
		this.getTopPlayers(year, this.topTenLeague)
	}

	setTopTenLeague = (value: string) => {
		this.topTenLeague = value
		this.getTopPlayers(this.currentYear, this.topTenLeague)
	}

	getTopPlayers = async (year: YearsChoice, league: string) => {
		try {
			this.toggleLoadingTopTen(true)

			if (league === 'mlb') {
				await Promise.all([this.getTopBatters(year), this.getTopPitchers(year)])
			} else if (league === 'tripleA') {
				await Promise.all([
					this.getTripleATopBatters(year),
					this.getTripleATopPitchers(year)
				])
			} else if (league === 'doubleA') {
				await Promise.all([
					this.getDoubleATopBatters(year),
					this.getDoubleATopPitchers(year)
				])
			} else if (league === 'highA') {
				await Promise.all([
					this.getHighATopBatters(year),
					this.getHighATopPitchers(year)
				])
			}
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingTopTen(false)
		}
	}

	getTopBatters = async (year: YearsChoice) => {
		try {
			const response = await getTopTenBatters(year)
			this.setBatterTopTen(response)
		} catch (error) {
			console.log(error)
		}
	}

	getTopPitchers = async (year: YearsChoice) => {
		try {
			const response = await getTopTenPitchers(year)
			this.setPitcherTopTen(response)
		} catch (error) {
			console.log(error)
		}
	}

	getTripleATopBatters = async (year: YearsChoice) => {
		try {
			const response = await getTripleATopTenBatters(year)
			this.setBatterTopTen(response)
		} catch (error) {
			console.log(error)
		}
	}

	getTripleATopPitchers = async (year: YearsChoice) => {
		try {
			const response = await getTripleATopTenPitchers(year)
			this.setPitcherTopTen(response)
		} catch (error) {
			console.log(error)
		}
	}

	getDoubleATopBatters = async (year: YearsChoice) => {
		try {
			const response = await getDoubleATopTenBatters(year)
			this.setBatterTopTen(response)
		} catch (error) {
			console.log(error)
		}
	}

	getDoubleATopPitchers = async (year: YearsChoice) => {
		try {
			const response = await getDoubleATopTenPitchers(year)
			this.setPitcherTopTen(response)
		} catch (error) {
			console.log(error)
		}
	}

	getHighATopBatters = async (year: YearsChoice) => {
		try {
			const response = await getHighATopTenBatters(year)
			this.setBatterTopTen(response)
		} catch (error) {
			console.log(error)
		}
	}

	getHighATopPitchers = async (year: YearsChoice) => {
		try {
			const response = await getHighATopTenPitchers(year)
			this.setPitcherTopTen(response)
		} catch (error) {
			console.log(error)
		}
	}
}

export default new TopTenStore()
