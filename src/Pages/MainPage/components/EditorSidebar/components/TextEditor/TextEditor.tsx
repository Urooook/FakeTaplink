import { Textarea } from '../../../../../../components/UI/Textarea/Textarea'
import { Button } from '../../../../../../components/UI/Button/Button'
import styles from './TextEditor.module.css'
import { useContext, useEffect } from 'react'
import { BlocksContext, TextBlockProps } from '../../../../context'
import { TextBlock } from '../../../blocks/TextBlock/TextBlock'

const initialTextEditorState: TextBlockProps = {
	text: '',
}
export const TextEditor = () => {
	const { blocks, activeBlock, onAddBlock, onDeleteBlock } = useContext(BlocksContext)

	// TODO подмуать над зависимостями
	useEffect(() => {
		if (!activeBlock && onAddBlock) {
			onAddBlock({ ...initialTextEditorState, component: <TextBlock text={''} /> })
		}
	}, [activeBlock])

	if (!onAddBlock || !onDeleteBlock) {
		return null
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (activeBlock?.id) {
			const currentBlock = blocks.get(activeBlock?.id)

			if (currentBlock) {
				currentBlock.text = e.target.value
				onAddBlock({ ...currentBlock, component: <TextBlock text={currentBlock.text} /> })
			}
		}
	}

	const handleDeleteBlock = () => {
		console.log('remove', activeBlock?.id)
		onDeleteBlock(activeBlock?.id)
	}

	return (
		<>
			<Textarea
				value={activeBlock?.text}
				onChange={handleInputChange}
				className={styles.textarea}
				placeholder={'Some text...'}
			/>
			<Button disabled={!activeBlock?.id} onClick={handleDeleteBlock}>
				Удалить
			</Button>
		</>
	)
}
