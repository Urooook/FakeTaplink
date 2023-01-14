import React, { ReactElement } from 'react'
import styles from './Loader.module.css'
import './Loader.module.css'

export default function Loader(): ReactElement {
	return (
		<div className={styles.preLoaderContainer}>
			<div className={styles.preLoader}>
				<div className={styles.loader} />
			</div>
		</div>
	)
}
