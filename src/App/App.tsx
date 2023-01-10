import React, { ReactElement } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Main from '../Main/Main'
import styles from './App.module.css'

const App = (): ReactElement => (
	<div className={styles.mainSection}>
		<Main />
	</div>
)

export default App
