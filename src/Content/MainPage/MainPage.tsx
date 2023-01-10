import styles from './MainPage.module.css'
import { DraggableCanvas } from '../DraggableCanvas/DraggableCanvas'
import { ControlsSidebar } from '../../components/ControlsSidebar/ControlsSidebar'
export const MainPage = () => {
	return (
		<div className={styles.container}>
			<ControlsSidebar />
			<div className={styles.mainSection}>
				<DraggableCanvas />
			</div>
		</div>
	)
}
