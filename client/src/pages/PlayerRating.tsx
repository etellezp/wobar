import React, { useEffect } from 'react'
// ==== REACT ROUTER ====
import { useParams, useLocation } from 'react-router-dom'
// ==== MOBX ====
import { observer } from 'mobx-react-lite'
// ==== STORES ====
import PlayerStore from 'src/stores/PlayerStore'
// ==== ANTD ====
import { Spin, Row, Col } from 'antd'
// ==== AG GRID ====
import { AgChartsReact } from 'ag-charts-react'
import { AgChartOptions } from 'ag-charts-community'

const PlayerRating: React.FC = observer(() => {
	const { id } = useParams()
	const { state } = useLocation()
	const { getPlayer, playerData, loadingPlayer, resetPlayerStore } = PlayerStore

	useEffect(() => {
		const playerPosition = state.position
		const year = state.year
		const league = state.league
		getPlayer(year, playerPosition, id, league)

		return () => {
			resetPlayerStore()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const charOptions: AgChartOptions = {
		theme: 'ag-vivid',
		title: {
			text: `${playerData.name}`,
			fontSize: 20
		},
		subtitle: {
			text: `${state.year} ${state.league} Season Ratings`,
			fontSize: 14
		},
		data: playerData.ratingHistory || [],
		series: [
			{
				type: 'line',
				xKey: 'date',
				yKey: 'rating',
				marker: {
					size: 2
				},
				strokeWidth: 1,
				tooltip: {
					renderer: function ({ datum, xKey, yKey }) {
						return {
							title: `Date: ${datum[xKey]}`,
							content: `Rating: ${datum[yKey].toFixed(2)}`
						}
					}
				}
			}
		],
		axes: [
			{
				type: 'category',
				position: 'bottom',
				title: {
					text: 'Date',
					fontSize: 12
				},
				label: {
					rotation: -45,
					avoidCollisions: true,
					minSpacing: 18,
					formatter: function (params) {
						const splitDate = params.value.split('-')
						const labelDate = `${splitDate[1]}-${splitDate[2]}`
						return labelDate
					}
				}
			},
			{
				type: 'number',
				position: 'left',
				title: {
					text: 'Rating',
					fontSize: 12
				}
			}
		]
	}

	return (
		<Spin spinning={loadingPlayer}>
			<Row justify='center' style={{ marginTop: '10px' }}>
				<Col xs={23} xl={20} style={{ height: '450px' }}>
					<AgChartsReact options={charOptions} />
				</Col>
			</Row>
		</Spin>
	)
})

export default PlayerRating
