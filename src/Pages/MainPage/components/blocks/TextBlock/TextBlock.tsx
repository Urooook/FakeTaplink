import styles from './TextBlock.module.css'
import { TextBlockProps } from '../../../blocksContext'

export const TextBlock = ({ text }: TextBlockProps) => {
	return <div className={styles.container}>{text}</div>
}
