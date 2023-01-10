import React, { ReactElement } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'

import Main from '../Main/Main'

const PrivateRoute = (): ReactElement => <Route path="/" element={<Main />} />

const App = (): ReactElement => (
	<Routes>
		<Route path="/" element={<Main />} />
	</Routes>
)

export default App
