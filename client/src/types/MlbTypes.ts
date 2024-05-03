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
	atBats?: number
	avg?: string
	hits?: number
	homeruns?: number
	obp?: string
	slg?: string
	ops?: string
	era?: string
	losses?: number
	numberOfPitches?: number
	strikes?: number
	strikesPercentage?: string
	whip?: string
	winPercentage?: string
	wins?: number
}

export interface IPosition {
	type: string
	abbreviation: string
}

export interface IRatingHistory {
	date: string
	rating: number
}
