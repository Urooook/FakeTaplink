import { Textarea } from '../../../../../../components/UI/Textarea/Textarea'
import { Button } from '../../../../../../components/UI/Button/Button'
import styles from './TextEditor.module.css'
import { useContext, useEffect } from 'react'
import {
	BlocksContext,
	CompoentNames,
	ComponentBlock,
	TextBlockProps,
} from '../../../../blocksContext'
import { TextBlock } from '../../../blocks/TextBlock/TextBlock'

const initialTextEditorState: TextBlockProps = {
	text: '',
}
export const TextEditor = () => {
	const { blocks, activeBlock, onAddBlock, onDeleteBlock } = useContext(BlocksContext)

	// TODO подмуать над зависимостями
	useEffect(() => {
		if (!activeBlock && onAddBlock) {
			onAddBlock({
				value: { ...initialTextEditorState },
				component: <TextBlock text={''} />,
				componentName: CompoentNames.TextBlock,
			})
		}
	}, [activeBlock])

	if (!onAddBlock || !onDeleteBlock) {
		return null
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
		valueProp: keyof TextBlockProps,
	) => {
		if (activeBlock?.id) {
			const currentBlock = blocks.get(activeBlock?.id) as ComponentBlock<TextBlockProps>

			if (currentBlock) {
				currentBlock.value[valueProp] = e.target.value
				onAddBlock({
					...currentBlock,
					component: <TextBlock text={currentBlock.value.text} />,
				})
			}
		}
	}

	const handleDeleteBlock = () => {
		onDeleteBlock(activeBlock?.id)
	}

	return (
		<>
			<Textarea
				value={activeBlock?.value.text}
				onChange={(e) => handleInputChange(e, 'text')}
				className={styles.textarea}
				placeholder={'Some text...'}
			/>
			<Button disabled={!activeBlock?.id} onClick={handleDeleteBlock}>
				Удалить
			</Button>
		</>
	)
}
