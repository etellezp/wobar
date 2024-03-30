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
		resetPlayersStore,
		toggleLeague,
		getPlayersData
	} = PlayersStore

	useEffect(() => {
		getPlayersData()

		return () => {
			resetPlayersStore()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const teamCellRenderer = (rowData: ICellRendererParams) => {
		const { value, data } = rowData

		return (
			<Row gutter={8} align='middle'>
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
				to={{ pathname: `/player/${data.id}` }}
				state={{ position, year, league }}
			>
				{value}
			</Link>
		)
	}

	const columnDefs: ColDef<IPlayer>[] = useMemo(() => {
		return [
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
				filter: 'agTextColumnFilter',
				minWidth: 300
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
				<Col xs={23} md={21} lg={19} xl={17}>
					<Row gutter={12}>
						<Col>
							<Select
								style={{ width: '120px' }}
								defaultValue='mlb'
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
								defaultValue='2024'
								onChange={handleYear}
								options={[
									{ value: '2024', label: '2024' },
									{ value: '2023', label: '2023' },
									{ value: '2022', label: '2022' }
								]}
							/>
						</Col>

						<Col>
							<Select
								defaultValue='batter'
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
					lg={19}
					xl={17}
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
