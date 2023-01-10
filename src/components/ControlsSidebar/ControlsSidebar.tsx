import styles from './ControlsSidebar.module.css'
import stylesControlButton from './components/ControlButton/ControlButton.module.css'
import { ControlButton } from './components/ControlButton/ControlButton'
import { BiPaint } from 'react-icons/bi'
import { BiFont } from 'react-icons/bi'
import { BiCodeAlt } from 'react-icons/bi'
import { useState } from 'react'

const controls = [
	{ title: 'Background', id: 'background', icon: <BiPaint className={stylesControlButton.icon} /> },
	{ title: 'Text', id: 'text', icon: <BiFont className={stylesControlButton.icon} /> },
	{
		title: 'HTML',
		id: 'html',
		icon: <BiCodeAlt className={stylesControlButton.icon} />,
	},
]
export const ControlsSidebar = () => {
	const [activeControl, setActiveControl] = useState<string | undefined>()

	const handleControlButtonClick = (controldId: string) => {
		setActiveControl(controldId)
	}

	return (
		<div className={styles.container}>
			{controls.map((control) => {
				return (
					<ControlButton
						title={control.title}
						icon={control.icon}
						controlId={control.id}
						isActive={control.id === activeControl}
						onClick={handleControlButtonClick}
					/>
				)
			})}
		</div>
	)
}
