import React, { useEffect, useMemo } from 'react'
// ==== MOBX ====
import { observer } from 'mobx-react-lite'
// ==== STORES ====
import PlayersStore from 'src/stores/PlayersStore'
// ==== REACT ROUTER ====
import { Link } from 'react-router-dom'
// ==== ANTD ====
import { Row, Col, Image, Select, Spin } from 'antd'
// ==== AG GRID ====
import { AgGridReact } from 'ag-grid-react'
import { ColDef, ICellRendererParams } from 'ag-grid-community'
// ==== TYPES ====
import { IPlayer } from 'src/types/MlbTypes'
import type { YearsChoice } from 'src/types/GlobalTypes'

const Rankings: React.FC = observer(() => {
	const {
		allBatters,
		allPitchers,
		togglePlayerPosition,
		toggleYear,
		loadingPlayers,
		toggleLeague,
		getPlayersData,
		currentLeague,
		currentYear,
		playerPosition
	} = PlayersStore

	useEffect(() => {
		getPlayersData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const teamCellRenderer = (rowData: ICellRendererParams) => {
		const { value, data } = rowData

		return (
			<Row gutter={8} align='middle' className='teamCellRow'>
				<Col style={{ display: 'flex' }}>
					<Image src={data.teamLogo} height={20} width={20} preview={false} />
				</Col>
				<Col className='teamCell'>{value}</Col>
			</Row>
		)
	}

	const nameCellRenderer = (rowData: ICellRendererParams) => {
		const { value, data } = rowData
		const position =
			PlayersStore.playerPosition === 'batter' ? 'Batter' : 'Pitcher'

		const year = PlayersStore.currentYear

		const league = PlayersStore.currentLeague

		return (
			<Link
				to={{
					pathname: `/player/${data.id}/${year}/${league}/${position}`
				}}
			>
				{value}
			</Link>
		)
	}

	const columnDefs: ColDef<IPlayer>[] = useMemo(() => {
		const shareColumns: ColDef<IPlayer>[] = [
			{
				field: 'rank',
				pinned: 'left',
				headerName: '#',
				filter: false,
				sortable: false,
				maxWidth: 60
			},
			{
				cellRenderer: nameCellRenderer,
				field: 'name',
				pinned: 'left',
				filter: 'agTextColumnFilter'
			},
			{
				field: 'team',
				cellRenderer: teamCellRenderer,
				filter: 'agTextColumnFilter'
			},
			{
				field: 'position.type',
				headerName: 'Position',
				filter: 'agTextColumnFilter'
			},
			{
				field: 'rating',
				filter: false,
				valueFormatter: data => data.value.toFixed(2)
			}
		]

		const batterColumns: ColDef<IPlayer>[] = [
			{
				field: 'atBats',
				headerName: 'At Bats',
				filter: false
			},
			{
				field: 'hits',
				headerName: 'Hits',
				filter: false
			},
			{
				field: 'homeruns',
				headerName: 'Homeruns',
				filter: false
			},
			{
				field: 'avg',
				headerName: 'AVG',
				filter: false,
				comparator: (valueA, valueB) => {
					return +valueA - +valueB
				}
			},
			{
				field: 'obp',
				headerName: 'OBP',
				filter: false,
				comparator: (valueA, valueB) => {
					return +valueA - +valueB
				}
			},
			{
				field: 'ops',
				headerName: 'OPS',
				filter: false,
				comparator: (valueA, valueB) => {
					return +valueA - +valueB
				}
			},
			{
				field: 'slg',
				headerName: 'SLG',
				filter: false,
				comparator: (valueA, valueB) => {
					return +valueA - +valueB
				}
			}
		]

		const pitcherColumns: ColDef<IPlayer>[] = [
			{
				field: 'era',
				headerName: 'ERA',
				filter: false,
				comparator: (valueA, valueB) => {
					return +valueA - +valueB
				}
			},
			{
				field: 'whip',
				headerName: 'WHIP',
				filter: false,
				comparator: (valueA, valueB) => {
					return +valueA - +valueB
				}
			},
			{
				field: 'numberOfPitches',
				headerName: 'Pitches',
				filter: false
			},
			{
				field: 'strikes',
				headerName: 'Strikes',
				filter: false
			},
			{
				field: 'strikesPercentage',
				headerName: 'Strikes %',
				filter: false,
				comparator: (valueA, valueB) => {
					return +valueA - +valueB
				}
			},
			{
				field: 'wins',
				headerName: 'Wins',
				filter: false
			},
			{
				field: 'losses',
				headerName: 'Losses',
				filter: false
			},
			{
				field: 'winPercentage',
				headerName: 'Win %',
				filter: false,
				comparator: (valueA, valueB) => {
					return +valueA - +valueB
				}
			}
		]

		return playerPosition === 'batter'
			? [...shareColumns, ...batterColumns]
			: [...shareColumns, ...pitcherColumns]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerPosition])

	const handlePlayerPosition = (value: 'batter' | 'pitcher') => {
		togglePlayerPosition(value)
	}

	const handleYear = (value: YearsChoice) => {
		toggleYear(value)
	}

	const handleLeague = (value: string) => {
		toggleLeague(value)
	}

	return (
		<Spin spinning={loadingPlayers}>
			<Row justify='center' gutter={[0, 12]}>
				<Col xs={23} md={21}>
					<Row gutter={12}>
						<Col>
							<Select
								style={{ width: '120px' }}
								defaultValue={currentLeague}
								onChange={handleLeague}
								options={[
									{ value: 'mlb', label: 'MLB' },
									{ value: 'tripleA', label: 'Triple-A' },
									{ value: 'doubleA', label: 'Double-A' },
									{ value: 'highA', label: 'High-A' }
								]}
							/>
						</Col>

						<Col>
							<Select
								defaultValue={currentYear}
								onChange={handleYear}
								options={[
									{ value: '2024', label: '2024' },
									{ value: '2023', label: '2023' },
									{ value: '2022', label: '2022' },
									{ value: '2021', label: '2021' },
									{ value: '2020', label: '2020' },
									{ value: '2019', label: '2019' },
									{ value: '2018', label: '2018' }
								]}
							/>
						</Col>

						<Col>
							<Select
								defaultValue={playerPosition}
								onChange={handlePlayerPosition}
								options={[
									{ value: 'batter', label: 'Batter' },
									{ value: 'pitcher', label: 'Pitcher' }
								]}
							/>
						</Col>
					</Row>
				</Col>

				<Col
					className='ag-theme-quartz'
					style={{ height: '450px' }}
					xs={23}
					md={21}
				>
					<AgGridReact
						rowData={
							PlayersStore.playerPosition === 'batter'
								? allBatters
								: allPitchers
						}
						columnDefs={columnDefs}
						autoSizeStrategy={{ type: 'fitCellContents' }}
						pagination={true}
						paginationPageSizeSelector={false}
						paginationPageSize={50}
						suppressMenuHide={true}
					/>
				</Col>
			</Row>
		</Spin>
	)
})

export default Rankings
