// ==== MOBX ====
import { makeAutoObservable } from 'mobx'
// ==== API ====
import {
	getPlayerRating,
	getTripleAPlayerRating,
	getDoubleAPlayerRating,
	getHighAPlayerRating
} from 'src/api/PlayerRatingsApi'
// ==== TYPES ====
import { IPlayer } from 'src/types/MlbTypes'
import type { YearsChoice } from 'src/types/GlobalTypes'

class PlayersStore {
	loadingPlayer: boolean = false
	playerData: Partial<IPlayer> = {}

	constructor() {
		makeAutoObservable(this)
	}

	resetPlayerStore = () => {
		this.playerData = {}
		this.loadingPlayer = false
	}

	setPlayerData = (data: IPlayer) => {
		const sortByDate = data.ratingHistory.sort((a, b) => {
			if (a.date < b.date) {
				return -1
			} else if (a.date > b.date) {
				return 1
			} else {
				return 0
			}
		})

		const playerObject = { ...data, ratingHistory: sortByDate }
		this.playerData = playerObject
	}

	toggleLoadingPlayer = (value: boolean) => {
		this.loadingPlayer = value
	}

	getPlayer = async (
		year: YearsChoice,
		position: 'Batter' | 'Pitcher',
		id: string | undefined,
		league: string
	) => {
		try {
			this.toggleLoadingPlayer(true)
			let response
			if (league === 'mlb') {
				response = await getPlayerRating(year, position, id)
			} else if (league === 'tripleA') {
				response = await getTripleAPlayerRating(year, position, id)
			} else if (league === 'doubleA') {
				response = await getDoubleAPlayerRating(year, position, id)
			} else if (league === 'highA') {
				response = await getHighAPlayerRating(year, position, id)
			}
			this.setPlayerData(response)
		} catch (error) {
			console.log(error)
		} finally {
			this.toggleLoadingPlayer(false)
		}
	}
}

export default new PlayersStore()
