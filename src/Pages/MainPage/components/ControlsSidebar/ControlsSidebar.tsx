import styles from './ControlsSidebar.module.css'
import stylesControlButton from './components/ControlButton/ControlButton.module.css'
import { ControlButton } from './components/ControlButton/ControlButton'
import {BiFont, BiPaint, BiCodeAlt, BiImageAdd, BiLinkAlt, BiNetworkChart, BiCarousel} from 'react-icons/bi'
import { ControlIds } from './enum'

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
