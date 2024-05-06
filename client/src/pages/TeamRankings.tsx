import React, { useEffect, useMemo } from 'react'
// ==== MOBX ====
import { observer } from 'mobx-react-lite'
// ==== STORES ====
import TeamStore from 'src/stores/TeamStore'
// ==== ANTD ====
import { Row, Col, Image, Select, Spin } from 'antd'
// ==== AG GRID ====
import { AgGridReact } from 'ag-grid-react'
import { ColDef, ICellRendererParams } from 'ag-grid-community'
import type { YearsChoice } from 'src/types/GlobalTypes'

const TeamRankings: React.FC = observer(() => {
	const {
		toggleYear,
		loadingTeams,
		toggleLeague,
		allTeams,
		getPlayersData,
		togglePlayerPosition,
		currentLeague,
		currentYear,
		playerPosition
	} = TeamStore

	useEffect(() => {
		getPlayersData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const teamCellRenderer = (rowData: ICellRendererParams) => {
		const { value, data } = rowData
		return (
			<Row gutter={8} align='middle' className='teamCellRow'>
				<Col
					style={{
						display: 'flex'
					}}
				>
					<Image src={data.teamLogo} height={20} width='auto' preview={false} />
				</Col>
				<Col className='teamCell'>{value}</Col>
			</Row>
		)
	}

	const columnDefs: ColDef[] = useMemo(() => {
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
				field: 'team',
				pinned: 'left',
				cellRenderer: teamCellRenderer,
				filter: 'agTextColumnFilter'
			},
			{
				field: 'league',
				filter: 'agTextColumnFilter'
			},
			{
				field: 'division',
				filter: 'agTextColumnFilter'
			},
			{
				field: 'averageRating',
				filter: false,
				valueFormatter: data => data.value.toFixed(2)
			}
		]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleYear = (value: YearsChoice) => {
		toggleYear(value)
	}

	const handleLeague = (value: string) => {
		toggleLeague(value)
	}

	const handlePlayerPosition = (value: 'batter' | 'pitcher' | 'all') => {
		togglePlayerPosition(value)
	}

	return (
		<Spin spinning={loadingTeams}>
			<Row justify='center' gutter={[0, 12]}>
				<Col xs={23} md={21} lg={19} xl={17}>
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
									{ value: '2020', label: '2020' }
								]}
							/>
						</Col>

						<Col>
							<Select
								style={{ width: '100px' }}
								defaultValue={playerPosition}
								onChange={handlePlayerPosition}
								options={[
									{ value: 'all', label: 'All' },
									{ value: 'batter', label: 'Batter' },
									{ value: 'pitcher', label: 'Pitcher' }
								]}
							/>
						</Col>
					</Row>
				</Col>

				<Col
					className='ag-theme-quartz'
					style={{ height: '500px' }}
					xs={23}
					md={21}
					lg={19}
					xl={17}
				>
					<AgGridReact
						rowData={allTeams}
						columnDefs={columnDefs}
						autoSizeStrategy={{ type: 'fitCellContents' }}
						pagination={false}
						suppressMenuHide={true}
					/>
				</Col>
			</Row>
		</Spin>
	)
})

export default TeamRankings
