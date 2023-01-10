import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import './Content.css'

import DefaultPage from './DefaultPage/DefaultPage'
import { MainPage } from './MainPage/MainPage'

export default function Content(): ReactElement {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="*" element={<DefaultPage />} />
		</Routes>
	)
}
