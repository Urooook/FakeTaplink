import { Input } from '../../../../../../components/UI/Input/Input'
import styles from './LinkEditor.module.css'
import { Button } from '../../../../../../components/UI/Button/Button'
import { useContext, useEffect } from 'react'
import { BlocksContext, ComponentBlock, LinkBlockProps } from '../../../../blocksContext'
import { LinkBlock } from '../../../blocks/LinkBlock/LinkBlock'

const initialLinkEditorState: LinkBlockProps = {
	text: 'Текст',
	link: '',
}

export const LinkEditor = () => {
	const { blocks, activeBlock, onAddBlock, onDeleteBlock } = useContext(BlocksContext)

	useEffect(() => {
		if (!activeBlock && onAddBlock) {
			onAddBlock({
				value: { ...initialLinkEditorState },
				component: <LinkBlock {...initialLinkEditorState} />,
			})
		}
	}, [activeBlock])

	if (!onAddBlock || !onDeleteBlock) {
		return null
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		valueProp: keyof LinkBlockProps,
	) => {
		if (activeBlock?.id) {
			const currentBlock = blocks.get(activeBlock?.id) as ComponentBlock<LinkBlockProps>

			if (currentBlock) {
				currentBlock.value[valueProp] = e.target.value
				onAddBlock({
					...currentBlock,
					component: <LinkBlock text={currentBlock.value.text} link={currentBlock.value.link} />,
				})
			}
		}
	}

	const handleDeleteBlock = () => {
		onDeleteBlock(activeBlock?.id)
	}

	return (
		<>
			<Input
				value={activeBlock?.value.text}
				placeholder={'Текст...'}
				className={styles.inputText}
				onChange={(e) => handleInputChange(e, 'text')}
			/>
			<Input
				value={(activeBlock as ComponentBlock<LinkBlockProps>)?.value.link}
				placeholder={'http://www.example.com/'}
				className={styles.inputLink}
				onChange={(e) => handleInputChange(e, 'link')}
			/>
			<Button onClick={handleDeleteBlock}>Удалить</Button>
		</>
	)
}
