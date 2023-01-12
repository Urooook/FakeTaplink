import styles from './ControlsSidebar.module.css'
import stylesControlButton from './components/ControlButton/ControlButton.module.css'
import { ControlButton } from './components/ControlButton/ControlButton'
import { BiPaint } from 'react-icons/bi'
import { BiFont } from 'react-icons/bi'
import { BiCodeAlt } from 'react-icons/bi'

const controls = [
	{ title: 'Themes', id: 'themes', icon: <BiPaint className={stylesControlButton.icon} /> },
	{ title: 'Text', id: 'text', icon: <BiFont className={stylesControlButton.icon} /> },
	{
		title: 'HTML',
		id: 'html',
		icon: <BiCodeAlt className={stylesControlButton.icon} />,
	},
]

type ControlSidebarProps = {
	activeControlId?: string
	onControlClick: (controldId: string) => void
}

export const ControlsSidebar = ({ onControlClick, activeControlId }: ControlSidebarProps) => {
	return (
		<div className={styles.container}>
			{controls.map((control) => {
				return (
					<ControlButton
						title={control.title}
						icon={control.icon}
						controlId={control.id}
						isActive={control.id === activeControlId}
						onClick={onControlClick}
						key={control.id}
					/>
				)
			})}
		</div>
	)
}
