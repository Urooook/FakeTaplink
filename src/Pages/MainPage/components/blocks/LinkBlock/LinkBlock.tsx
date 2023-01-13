import styles from './LinkBlock.module.css'
import { LinkBlockProps } from '../../../blocksContext'
import { Button } from '../../../../../components/UI/Button/Button'
import { useContext } from 'react'
import { ThemeContext } from '../../../themeContext'

export const LinkBlock = ({ text, link }: LinkBlockProps) => {
	const {
		theme: { color, backgroundColor },
	} = useContext(ThemeContext)
	const handleOpenLink = () => {
		window.open(link, '_blank')
	}

	return (
		<div className={styles.container}>
			<Button style={{ color, backgroundColor }} onClick={handleOpenLink} className={styles.button}>
				{text}
			</Button>
		</div>
	)
}
