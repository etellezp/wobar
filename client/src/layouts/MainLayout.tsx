import React from 'react'
// ==== REACT ROUTER ====
import { Outlet, Link } from 'react-router-dom'
// ==== ANTD ====
import { Affix, Layout, Typography, Row, Col } from 'antd'
import { CrownOutlined, FundViewOutlined } from '@ant-design/icons'
// ==== ASSETS ====
import wobarLogo from 'src/assets/wobarLogo.png'

const { Header, Content } = Layout
const { Text } = Typography

const MainLayout: React.FC = () => {
	return (
		<Layout>
			<Affix offsetTop={0}>
				<Header className='navHeader'>
					<Row justify='space-between'>
						<Col className='headerLogoContainer'>
							<Link to='/'>
								<img className='headerLogo' src={wobarLogo} alt='Wobar Logo' />
							</Link>
						</Col>

						<Col>
							<Row align='middle' gutter={18}>
								<Col>
									<Text className='menuLink'>
										<Link to='/'>
											<CrownOutlined className='menuIcon' /> Top 10
										</Link>
									</Text>
								</Col>

								<Col>
									<Text className='menuLink'>
										<Link to='/playerRankings'>
											<FundViewOutlined className='menuIcon' /> Rankings
										</Link>
									</Text>
								</Col>
							</Row>
						</Col>
					</Row>
				</Header>
			</Affix>

			<Content className='mainContent'>
				<Outlet />
			</Content>
		</Layout>
	)
}

export default MainLayout
