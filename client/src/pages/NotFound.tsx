import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
	return (
		<Result
			status='404'
			title='404'
			subTitle="Oops! Looks like this page got caught stealing a base. It's out!"
			extra={
				<Button type='primary'>
					<Link to='/'>Back Home</Link>
				</Button>
			}
		/>
	)
}

export default NotFoundPage
