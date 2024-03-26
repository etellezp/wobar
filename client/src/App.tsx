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
// ==== COMPONENTS ====
import MainLayout from 'src/layouts/MainLayout'
import NotFound from 'src/pages/NotFound'
import PlayerRating from 'src/pages/PlayerRating'
import Rankings from 'src/pages/Rankings'
// ==== AG GRID ====
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<MainLayout />}>
			<Route index element={<TopTen />} />
			<Route path='/playerRankings' element={<Rankings />} />
			<Route path='/player/:id' element={<PlayerRating />} />
			<Route path='*' element={<NotFound />} />
		</Route>
	)
)

const App: React.FC = () => {
	return <RouterProvider router={router} />
}

export default App
