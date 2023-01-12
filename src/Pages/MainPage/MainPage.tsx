import styles from './MainPage.module.css'
import { DraggableCanvas } from './components/DraggableCanvas/DraggableCanvas'
import { ControlsSidebar } from './components/ControlsSidebar/ControlsSidebar'
import { EditorSidebar } from './components/EditorSidebar/EditorSidebar'
import { useState } from 'react'
export const MainPage = () => {
	const [activeControlId, setActiveControlId] = useState<string>('themes')

	const handleControlClick = (controlId: string) => {
		setActiveControlId(controlId)
	}

	return (
		<div className={styles.container}>
			<ControlsSidebar activeControlId={activeControlId} onControlClick={handleControlClick} />
			<div className={styles.mainSection}>
				<DraggableCanvas />
			</div>
			<EditorSidebar currentEditor={activeControlId} />
		</div>
	)
}
