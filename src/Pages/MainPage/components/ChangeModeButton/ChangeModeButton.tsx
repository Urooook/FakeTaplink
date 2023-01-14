import { Button } from '../../../../components/UI/Button/Button'
import { BiEdit, BiVideo } from 'react-icons/bi'
import styles from './ChangeModeButton.module.css'
import { useContext } from 'react'
import { Mode, ModeContext } from '../../modeContext'

export const ChangeModeButton = () => {
	const { mode, onModeChange } = useContext(ModeContext)

	if (!onModeChange) {
		return null
	}

	return (
		<div className={styles.container}>
			{mode === Mode.edit && (
				<>
					<BiEdit className={styles.icon} />
					<Button onClick={() => onModeChange(Mode.view)}>Редактирование</Button>
				</>
			)}
			{mode === Mode.view && (
				<>
					<BiVideo className={styles.icon} />
					<Button onClick={() => onModeChange(Mode.edit)}>Просмотр</Button>
				</>
			)}
		</div>
	)
}
