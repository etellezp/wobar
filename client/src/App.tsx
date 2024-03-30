import React from 'react'
// ==== REACT ROUTER ====
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider
} from 'react-router-dom'
// ==== PAGES ====
import TopTen from 'src/pages/TopTen'
import PlayerRating from 'src/pages/PlayerRating'
import Rankings from 'src/pages/Rankings'
import NotFound from 'src/pages/NotFound'
import TeamRankings from 'src/pages/TeamRankings'
// ==== COMPONENTS ====
import MainLayout from 'src/layouts/MainLayout'
// ==== AG GRID ====
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<MainLayout />}>
			<Route index element={<TopTen />} />
			<Route path='/team-rankings' element={<TeamRankings />} />
			<Route path='/player-rankings' element={<Rankings />} />
			<Route path='/player/:id' element={<PlayerRating />} />
			<Route path='*' element={<NotFound />} />
		</Route>
	)
)

const App: React.FC = () => {
	return <RouterProvider router={router} />
}

export default App
