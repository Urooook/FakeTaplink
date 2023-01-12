import { Textarea } from '../../../../../../components/UI/Textarea/Textarea'
import { Button } from '../../../../../../components/UI/Button/Button'
import styles from './TextEditor.module.css'

export const TextEditor = () => {
	return (
		<>
			<Textarea className={styles.textarea} placeholder={'Some text...'} />
			<Button>Remove</Button>
		</>
	)
}
