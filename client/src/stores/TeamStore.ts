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

interface ITeams {
	team: string
	teamLogo: string
	averageRating: number
	rank?: string
}

interface ITeamData {
	team: string
	teamLogo: string
	totalRating: number
	playerCount: number
	rank?: number
}

class TeamStore {
	loadingTeams: boolean = false
	allTeams: ITeams[] = []
	currentYear: YearsChoice = '2024'
	currentLeague: string = 'mlb'

	constructor() {
		makeAutoObservable(this)
	}

	resetTeamStore = () => {
		this.loadingTeams = false
		this.allTeams = []
		this.currentYear = '2024'
		this.currentLeague = 'mlb'
	}

	setAllTeams = (data: IPlayer[]) => {
		const teamData = data.reduce((acc: Record<string, ITeamData>, obj) => {
			const team = obj.team

			if (!acc[team]) {
				acc[team] = {
					team: team,
					teamLogo: obj.teamLogo,
					totalRating: 0,
					playerCount: 0
				}
			}
			acc[team].totalRating += obj.rating
			acc[team].playerCount++
			return acc
		}, {})

		const teamsArray = Object.values(teamData).map(team => ({
			team: team.team,
			teamLogo: team.teamLogo,
			averageRating: team.totalRating / team.playerCount
		}))

		teamsArray.sort((a, b) => b.averageRating - a.averageRating)

		teamsArray.forEach((team: Partial<ITeamData>, index) => {
			team.rank = index + 1
		})
		this.allTeams = teamsArray
	}

	updateCurrentYear = (year: YearsChoice) => {
		this.currentYear = year
	}

	updateCurrentleague = (value: string) => {
		this.currentLeague = value
	}

	toggleLoadingTeams = (value: boolean) => [(this.loadingTeams = value)]

	toggleLeague = (value: string) => {
		this.updateCurrentleague(value)
		this.getPlayersData()
	}

	toggleYear = (year: YearsChoice) => {
		this.updateCurrentYear(year)
		this.getPlayersData()
	}

	getPlayersData = async () => {
		if (this.currentLeague === 'mlb') {
			this.getMlbTeams()
		} else if (this.currentLeague === 'tripleA') {
			this.getTripleATeams()
		} else if (this.currentLeague === 'doubleA') {
			this.getDoubleATeams()
		} else if (this.currentLeague === 'highA') {
			this.getHighATeams()
		}
	}

	getMlbTeams = async () => {
		try {
			this.toggleLoadingTeams(true)
			const batters = await getBatterRatings(this.currentYear)
			const pitchers = await getPitcherRatings(this.currentYear)

			const allPlayers = [...batters, ...pitchers]

			this.setAllTeams(allPlayers)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingTeams(false)
		}
	}

	getTripleATeams = async () => {
		try {
			this.toggleLoadingTeams(true)
			const batters = await getTripleABatterRatings(this.currentYear)
			const pitchers = await getTripleAPitcherRatings(this.currentYear)

			const allPlayers = [...batters, ...pitchers]

			this.setAllTeams(allPlayers)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingTeams(false)
		}
	}

	getDoubleATeams = async () => {
		try {
			this.toggleLoadingTeams(true)
			const batters = await getDoubleABatterRatings(this.currentYear)
			const pitchers = await getDoubleAPitcherRatings(this.currentYear)

			const allPlayers = [...batters, ...pitchers]

			this.setAllTeams(allPlayers)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingTeams(false)
		}
	}

	getHighATeams = async () => {
		try {
			this.toggleLoadingTeams(true)
			const batters = await getHighABatterRatings(this.currentYear)
			const pitchers = await getHighAPitcherRatings(this.currentYear)

			const allPlayers = [...batters, ...pitchers]

			this.setAllTeams(allPlayers)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingTeams(false)
		}
	}
}

export default new TeamStore()
