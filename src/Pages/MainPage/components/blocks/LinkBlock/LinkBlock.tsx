import styles from './LinkBlock.module.css'
import { LinkBlockProps } from '../../../blocksContext'
import { Button } from '../../../../../components/UI/Button/Button'
import { useContext } from 'react'
import { ThemeContext } from '../../../themeContext'
import { Mode, ModeContext } from '../../../modeContext'
import cn from 'classnames'

export const LinkBlock = ({ text, link }: LinkBlockProps) => {
	const {
		theme: { color, backgroundColor },
	} = useContext(ThemeContext)
	const { mode } = useContext(ModeContext)

	const handleOpenLink = () => {
		window.open(link, '_blank')
	}

	return (
		<div className={styles.container}>
			{mode === Mode.edit && (
				<div
					style={{ color: backgroundColor, backgroundColor: color }}
					className={cn(styles.buttonView, styles.button)}
				>
					{text}
				</div>
			)}
			{mode === Mode.view && (
				<Button
					style={{ color: backgroundColor, backgroundColor: color }}
					onClick={handleOpenLink}
					className={styles.button}
				>
					{text}
				</Button>
			)}
		</div>
	)
}
