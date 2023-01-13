import { Input } from '../../../../../../components/UI/Input/Input'
import styles from './LinkEditor.module.css'
import { Button } from '../../../../../../components/UI/Button/Button'
import { useContext } from 'react'
import { BlocksContext } from '../../../../context'

export const LinkEditor = () => {
	const { blocks, activeBlock, onAddBlock, onDeleteBlock } = useContext(BlocksContext)

	return (
		<>
			<Input placeholder={'Текст...'} className={styles.inputText} />
			<Input placeholder={'http://www.example.com/'} className={styles.inputLink} />
			<Button>Удалить</Button>
		</>
	)
}
