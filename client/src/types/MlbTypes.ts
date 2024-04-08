export interface IPlayer {
	id: number
	name: string
	rating: number
	rank: number
	team: string
	teamLogo: string
	position: IPosition
	ratingHistory: IRatingHistory[]
	league: string
	division: string
}

export interface IPosition {
	type: string
	abbreviation: string
}

export interface IRatingHistory {
	date: string
	rating: number
}
