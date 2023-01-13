import styles from './TextBlock.module.css'
import { TextBlockProps } from '../../../blocksContext'
import { useContext } from 'react'
import { ThemeContext } from '../../../themeContext'

export const TextBlock = ({ text }: TextBlockProps) => {
	const {
		theme: { color },
	} = useContext(ThemeContext)

	return (
		<div className={styles.container} style={{ color }}>
			{text}
		</div>
	)
}
