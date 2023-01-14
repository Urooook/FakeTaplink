import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import {
	BlocksContext,
	CompoentNames,
	ComponentBlock,
	ImageBlockProps,
} from '../../../../blocksContext'
import { ImageBlock } from '../../../blocks/ImageBlock/ImageBlock'
import styles from './ImageEditor.module.css'
import { Button } from '../../../../../../components/UI/Button/Button'

const initialTextEditorState: ImageBlockProps = {
	image: '',
}

export const ImageEditor = () => {
	const [selectedImage, setSelectedImage] = useState<string>('')
	const [isAvatar, setIsAvatar] = useState<boolean>(false)
	const { blocks, activeBlock, onAddBlock, onDeleteBlock } = useContext(BlocksContext)

	useEffect(() => {
		if (!activeBlock?.id && onAddBlock) {
			onAddBlock({
				value: { ...initialTextEditorState },
				component: <ImageBlock image={selectedImage} />,
				componentName: CompoentNames.ImageBlock,
			})
		}
	}, [activeBlock])

	const getBase64 = (file: File): Promise<any> | null => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => resolve(reader.result)
			reader.onerror = (error) => reject(error)
			reader.readAsDataURL(file)
		})
	}

	if (!onAddBlock || !onDeleteBlock) {
		return null
	}

	const getImage = async (
		event: ChangeEvent<HTMLInputElement>,
		valueProp: keyof ImageBlockProps,
	) => {
		if (!event.target.files) return
		const file = event.target.files[0]
		const base: string = await getBase64(file)
		setSelectedImage(base)

		console.log(activeBlock)
		// console.log(base)
		if (activeBlock?.id) {
			const currentBlock = blocks.get(activeBlock?.id) as unknown as ComponentBlock<ImageBlockProps>
			console.log(currentBlock)

			if (currentBlock) {
				currentBlock.value[valueProp] = base

				onAddBlock({
					...currentBlock,
					component: <ImageBlock image={base} />,
				})
			}
		}
	}

	const handleDeleteBlock = () => {
		onDeleteBlock(activeBlock?.id)
	}

	return (
		<div>
			{/*<h1>Upload and Display Image usign React Hook's</h1>*/}
			{selectedImage && (
				<div>
					<img alt="not fount" width={'250px'} src={selectedImage} />
					<br />
					<button onClick={() => setSelectedImage('')}>Remove</button>
				</div>
			)}
			<br />

			<br />
			<input
				className={styles.file}
				type="file"
				name="myImage"
				onChange={(event) => getImage(event, 'image')}
			/>
			<Button onClick={handleDeleteBlock}>Удалить</Button>
		</div>
	)
}
