import React, { ReactElement } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './App.module.css'
import AppRoutes from './AppRoutes'

const App = (): ReactElement => (
	<div className={styles.mainSection}>
		<AppRoutes />
	</div>
)

export default App
