import styles from './ControlButton.module.css'
import cn from 'classnames'
import { ReactNode } from 'react'

type ControlButtonProps = {
	title: string
	icon: ReactNode
	controlId: string
	isActive?: boolean

	onClick: (controlId: string) => void
}
export const ControlButton = ({
	title,
	icon,
	controlId,
	isActive = false,
	onClick,
}: ControlButtonProps) => {
	const handleClick = () => {
		onClick(controlId)
	}
	return (
		<div className={cn(styles.container, { [styles.active]: isActive })} onClick={handleClick}>
			{icon}
			<span className={styles.title}>{title}</span>
		</div>
	)
}
