import styles from './ControlButton.module.css'
import cn from 'classnames'
import { ReactNode, useContext } from 'react'
import { BlocksContext } from '../../../../context'

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
	const { onChangeActiveBlock } = useContext(BlocksContext)

	if (!onChangeActiveBlock) {
		return null
	}
	const handleClick = () => {
		onClick(controlId)
		onChangeActiveBlock(null)
	}
	return (
		<div className={cn(styles.container, { [styles.active]: isActive })} onClick={handleClick}>
			{icon}
			<span className={styles.title}>{title}</span>
		</div>
	)
}
