import React, { useEffect } from 'react'
// ==== MOBX ====
import { observer } from 'mobx-react-lite'
// ==== STORES ====
import TopTenStore from 'src/stores/TopTenStore'
// ==== ANTD ====
import { Row, Col, Select, Spin, Typography } from 'antd'
// ==== COMPONENTS ====
import PlayerTopTenView from 'src/components/TopTen/PlayerTopTenView'
// ==== TYPES ====
import type { YearsChoice } from 'src/types/GlobalTypes'

const { Title } = Typography

const TopTen: React.FC = observer(() => {
	const {
		batterTopTen,
		pitcherTopTen,
		getTopPlayers,
		setTopTenYear,
		loadingTopTen,
		setTopTenLeague,
		currentYear,
		topTenLeague
	} = TopTenStore

	useEffect(() => {
		getTopPlayers(currentYear, topTenLeague)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleTopTenYear = (value: YearsChoice) => {
		setTopTenYear(value)
	}

	const handleTopTenLeague = (value: string) => {
		setTopTenLeague(value)
	}

	return (
		<Spin spinning={loadingTopTen}>
			<Row className='topTenFilterContainer'>
				<Col xs={{ offset: 2 }}>
					<Row gutter={12}>
						<Col>
							<Select
								style={{ width: '120px' }}
								defaultValue={topTenLeague}
								onChange={handleTopTenLeague}
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
								onChange={handleTopTenYear}
								options={[
									{ value: '2024', label: '2024' },
									{ value: '2023', label: '2023' },
									{ value: '2022', label: '2022' },
									{ value: '2021', label: '2021' },
									{ value: '2020', label: '2020' }
								]}
							/>
						</Col>
					</Row>
				</Col>
			</Row>

			<Row align='middle' justify='center' gutter={18}>
				<Col xs={20} lg={10}>
					<Title level={4} style={{ fontWeight: 300 }}>
						Top 10 Batters
					</Title>
					<PlayerTopTenView
						players={batterTopTen}
						playerPosition='Batter'
						year={currentYear}
						league={topTenLeague}
					/>
				</Col>

				<Col xs={20} lg={10}>
					<Title level={4} style={{ fontWeight: 300 }}>
						Top 10 Pitchers
					</Title>
					<PlayerTopTenView
						players={pitcherTopTen}
						playerPosition='Pitcher'
						year={currentYear}
						league={topTenLeague}
					/>
				</Col>
			</Row>
		</Spin>
	)
})

export default TopTen
