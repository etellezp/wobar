import React from 'react'
// ==== MOBX ====
import { observer } from 'mobx-react-lite'
// ==== COMPONENTS ====
import PlayerInfo from 'src/components/TopTen/PlayerInfo'
// ==== TYPES ====
import { IPlayer } from 'src/types/MlbTypes'
import type { YearsChoice } from 'src/types/GlobalTypes'

interface IProps {
	players: IPlayer[]
	playerPosition: 'Batter' | 'Pitcher'
	year: YearsChoice
	league: string
}

const PlayerTopTenView: React.FC<IProps> = observer(
	({ players, playerPosition, year, league }) => {
		return players.map((player, index) => (
			<div key={player.id}>
				<PlayerInfo
					player={player}
					ranking={index + 1}
					playerPosition={playerPosition}
					year={year}
					league={league}
				/>
			</div>
		))
	}
)

export default PlayerTopTenView
