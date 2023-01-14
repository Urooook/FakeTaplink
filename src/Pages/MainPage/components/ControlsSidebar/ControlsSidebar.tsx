import styles from './ControlsSidebar.module.css'
import stylesControlButton from './components/ControlButton/ControlButton.module.css'
import { ControlButton } from './components/ControlButton/ControlButton'
import { BiCodeAlt, BiFont, BiImageAdd, BiLinkAlt, BiNetworkChart, BiPaint, BiCarousel } from 'react-icons/bi'
import { ControlIds } from './enum'
import cn from 'classnames'
import { useContext } from 'react'
import { Mode, ModeContext } from '../../modeContext'

const controls = [
	{ title: 'Тема', id: ControlIds.themes, icon: <BiPaint className={stylesControlButton.icon} /> },
	{ title: 'Текст', id: ControlIds.text, icon: <BiFont className={stylesControlButton.icon} /> },
	{
		title: 'HTML',
		id: ControlIds.html,
		icon: <BiCodeAlt className={stylesControlButton.icon} />,
	},
	{
		title: 'Ссылка',
		id: ControlIds.link,
		icon: <BiLinkAlt className={stylesControlButton.icon} />,
	},
	{
		title: 'Изображение',
		id: ControlIds.image,
		icon: <BiImageAdd className={stylesControlButton.icon} />,
	},
	{
		title: 'Соцсети',
		id: ControlIds.social,
		icon: <BiNetworkChart className={stylesControlButton.icon} />,
	},
	{
		title: 'Карусель',
		id: ControlIds.carousel,
		icon: <BiCarousel className={stylesControlButton.icon} />,
	},
]

type ControlSidebarProps = {
	activeControlId?: string
	onControlClick: (controldId: string) => void
}

export const ControlsSidebar = ({ onControlClick, activeControlId }: ControlSidebarProps) => {
	const { mode } = useContext(ModeContext)

	return (
		<div className={cn(styles.container, { [styles.hidden]: mode === Mode.view })}>
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
