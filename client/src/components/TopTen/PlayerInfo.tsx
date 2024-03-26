import React from 'react'
// ==== MOBX ====
import { observer } from 'mobx-react-lite'
// ==== REACT ROUTER ====
import { Link } from 'react-router-dom'
// ==== ANTD ====
import { Row, Col, Card, Flex, Typography } from 'antd'
// ==== TYPES ====
import { IPlayer } from 'src/types/MlbTypes'
import type { YearsChoice } from 'src/types/GlobalTypes'

interface IProps {
	player: IPlayer
	ranking: number
	playerPosition: 'Batter' | 'Pitcher'
	year: YearsChoice
	league: string
}

const { Text } = Typography

const PlayerInfo: React.FC<IProps> = observer(
	({ player, ranking, playerPosition, year, league }) => {
		return (
			<Card className='topPlayerCardContainer'>
				<Row justify='space-between' align='middle' style={{ height: '100%' }}>
					<Col>
						<Row align='middle' gutter={18}>
							<Col className='rankingContainer'>
								<Text className='topPlayerRanking'>{ranking}</Text>
							</Col>

							<Col>
								<img
									className='playerImage'
									src={`https://midfield.mlbstatic.com/v1/people/${player.id}/spots/120`}
									alt={`${player.name} image`}
								/>
							</Col>

							<Col>
								<Flex vertical>
									<Link
										to={`player/${player.id}`}
										state={{ position: playerPosition, year, league }}
									>
										<span className='playerName'>
											{player.name.toUpperCase()}
										</span>
									</Link>
									<span className='playerInfo'>
										<img src={player.teamLogo} className='playerTeamLogo' />{' '}
										{player.team}
									</span>
								</Flex>
							</Col>
						</Row>
					</Col>

					<Col>
						<Text className='playerRating'>{player.rating.toFixed(2)}</Text>
					</Col>
				</Row>
			</Card>
		)
	}
)

export default PlayerInfo
