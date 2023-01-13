import styles from './MainPage.module.css'
import { DraggableCanvas } from './components/DraggableCanvas/DraggableCanvas'
import { ControlsSidebar } from './components/ControlsSidebar/ControlsSidebar'
import { EditorSidebar } from './components/EditorSidebar/EditorSidebar'
import { useCallback, useState } from 'react'
import { Block, BlockId, BlocksContext } from './blocksContext'
import { ControlIds } from './components/ControlsSidebar/enum'

const DEFAULT_CONTROL = ControlIds.themes

export const MainPage = () => {
	const [activeControlId, setActiveControlId] = useState<string>(DEFAULT_CONTROL)
	const [blocks, setBlocks] = useState<Map<BlockId, Block>>(new Map<BlockId, Block>())
	const [activeBlock, setActiveBlock] = useState<Block | null>(null)

	const handleAddBlock = useCallback(
		(newBlock: Block) => {
			if (!newBlock.id) {
				// TODO подумать над хэш функцйией
				const newId = String(Math.round(Math.random() * 90000000000))
				newBlock.id = newId
			}
			setBlocks(new Map(blocks.set(newBlock.id, newBlock)))
			setActiveBlock(newBlock)
		},
		[blocks],
	)

	const handleDeleteBlock = useCallback(
		(blockId: BlockId | undefined | null) => {
			if (blockId) {
				blocks.delete(blockId)
				setBlocks(new Map(blocks))
				setActiveBlock(null)
				setActiveControlId(DEFAULT_CONTROL)
			}
		},
		[blocks],
	)

	const handleControlClick = (controlId: string) => {
		setActiveControlId(controlId)
	}

	return (
		<BlocksContext.Provider
			value={{
				blocks,
				activeBlock,
				onAddBlock: handleAddBlock,
				onDeleteBlock: handleDeleteBlock,
				onChangeActiveBlock: setActiveBlock,
			}}
		>
			<div className={styles.container}>
				<ControlsSidebar activeControlId={activeControlId} onControlClick={handleControlClick} />
				<div className={styles.mainSection}>
					<div className={styles.mobileSecition}>
						<DraggableCanvas />
					</div>
				</div>
				<EditorSidebar currentEditor={activeControlId} />
			</div>
		</BlocksContext.Provider>
	)
}
