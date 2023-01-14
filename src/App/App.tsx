import React, { ReactElement, Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './App.module.css'
import AppRoutes from './AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import Loader from '../components/Loader/Loader'

const App = (): ReactElement => (
	<div className={styles.mainSection}>
		<Suspense fallback={<Loader />}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<AppRoutes />
			</BrowserRouter>
		</Suspense>
	</div>
)

export default App
