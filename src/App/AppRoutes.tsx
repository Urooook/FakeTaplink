import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

import DefaultPage from '../Pages/DefaultPage/DefaultPage'
import { MainPage } from '../Pages/MainPage/MainPage'

export default function AppRoutes(): ReactElement {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="*" element={<DefaultPage />} />
		</Routes>
	)
}
