import styles from './LinkBlock.module.css'
import { LinkBlockProps } from '../../../context'
import { Button } from '../../../../../components/UI/Button/Button'

export const LinkBlock = ({ text, link }: LinkBlockProps) => {
	const handleOpenLink = () => {
		window.open(link, '_blank')
	}

	return (
		<div className={styles.container}>
			<Button onClick={handleOpenLink} className={styles.button}>
				{text}
			</Button>
		</div>
	)
}
