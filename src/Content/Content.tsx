import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import './Content.css'

import DefaultPage from './DefaultPage/DefaultPage'
import { DraggableCanvas } from './DraggableCanvas/DraggableCanvas'

export default function Content(): ReactElement {
	return (
		<div className="app-container">
			<Routes>
				<Route path="/" element={<DraggableCanvas />} />
				<Route path="*" element={<DefaultPage />} />
			</Routes>
		</div>
	)
}
