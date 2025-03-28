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
	rank?: number
	league: string
	division: string
}

interface IAllTeamData {
	team: string
	teamLogo: string
	rank?: number
	league: string
	division: string
	batterRating: number
	pitcherRating: number
}

interface IAllPlayers {
	batters: IPlayer[]
	pitchers: IPlayer[]
}

class TeamStore {
	loadingTeams: boolean = false
	allTeams: ITeams[] = []
	currentYear: YearsChoice = '2025'
	currentLeague: string = 'mlb'
	playerPosition: 'batter' | 'pitcher' | 'all' = 'all'

	constructor() {
		makeAutoObservable(this)
	}

	setAllTeams = (data: IAllPlayers) => {
		const allBatters = data.batters
		const allPitchers = data.pitchers
		const allPlayers = [...allBatters, ...allPitchers]

		const batterData = allBatters.reduce(
			(acc: Record<string, ITeamData>, obj) => {
				const team = obj.team

				if (!acc[team]) {
					acc[team] = {
						team: team,
						teamLogo: obj.teamLogo,
						totalRating: 0,
						league: obj.league,
						division: obj.division
					}
				}
				acc[team].totalRating += obj.rating ? obj.rating - 100 : 0
				return acc
			},
			{}
		)

		const pitcherData = allPitchers.reduce(
			(acc: Record<string, ITeamData>, obj) => {
				const team = obj.team

				if (!acc[team]) {
					acc[team] = {
						team: team,
						teamLogo: obj.teamLogo,
						totalRating: 0,
						league: obj.league,
						division: obj.division
					}
				}
				acc[team].totalRating += obj.rating ? obj.rating - 100 : 0
				return acc
			},
			{}
		)

		const teamData = allPlayers.reduce(
			(acc: Record<string, IAllTeamData>, obj) => {
				const team = obj.team
				const isBatter = obj.position.type !== 'Pitcher'

				if (!acc[team]) {
					acc[team] = {
						team: team,
						teamLogo: obj.teamLogo,
						batterRating: 0,
						pitcherRating: 0,
						league: obj.league,
						division: obj.division
					}
				}
				if (isBatter) {
					acc[team].batterRating += obj.rating ? obj.rating - 100 : 0
				} else {
					acc[team].pitcherRating += obj.rating ? obj.rating - 100 : 0
				}
				return acc
			},
			{}
		)

		let teamsArray

		if (this.playerPosition === 'batter') {
			teamsArray = Object.values(batterData).map(team => ({
				team: team.team,
				teamLogo: team.teamLogo,
				averageRating: team.totalRating,
				league: team.league,
				division: team.division
			}))
		} else if (this.playerPosition === 'pitcher') {
			teamsArray = Object.values(pitcherData).map(team => ({
				team: team.team,
				teamLogo: team.teamLogo,
				averageRating: team.totalRating,
				league: team.league,
				division: team.division
			}))
		} else {
			teamsArray = Object.values(teamData).map(team => ({
				team: team.team,
				teamLogo: team.teamLogo,
				averageRating: team.batterRating + team.pitcherRating,
				league: team.league,
				division: team.division
			}))
		}

		teamsArray.sort((a, b) => b.averageRating - a.averageRating)

		const teamsData = teamsArray.filter(
			team => team.team !== null && team.team !== ''
		)

		teamsData.forEach((team: Partial<ITeamData>, index) => {
			team.rank = index + 1
		})

		this.allTeams = teamsData
	}

	updateCurrentYear = (year: YearsChoice) => {
		this.currentYear = year
	}

	updateCurrentleague = (value: string) => {
		this.currentLeague = value
	}

	updatePlayerPosition = (position: 'batter' | 'pitcher' | 'all') => {
		this.playerPosition = position
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

	togglePlayerPosition = (position: 'batter' | 'pitcher' | 'all') => {
		this.updatePlayerPosition(position)
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

	getAllTeams = (batters: IPlayer[], pitchers: IPlayer[]) => {
		const allPlayers: IAllPlayers = {
			batters: [],
			pitchers: []
		}

		allPlayers.batters = [...batters]
		allPlayers.pitchers = [...pitchers]

		this.setAllTeams(allPlayers)
	}

	getMlbTeams = async () => {
		try {
			this.toggleLoadingTeams(true)
			const batters = await getBatterRatings(this.currentYear)
			const pitchers = await getPitcherRatings(this.currentYear)
			this.getAllTeams(batters, pitchers)
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
			this.getAllTeams(batters, pitchers)
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
			this.getAllTeams(batters, pitchers)
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
			this.getAllTeams(batters, pitchers)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingTeams(false)
		}
	}
}

export default new TeamStore()
