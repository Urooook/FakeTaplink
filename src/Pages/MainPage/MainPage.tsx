import styles from './MainPage.module.css'
import { DraggableCanvas } from './components/DraggableCanvas/DraggableCanvas'
import { ControlsSidebar } from './components/ControlsSidebar/ControlsSidebar'
import { EditorSidebar } from './components/EditorSidebar/EditorSidebar'
import { useCallback, useEffect, useState } from 'react'
import { Block, BlockId, BlocksContext } from './blocksContext'
import { ControlIds } from './components/ControlsSidebar/enum'
import { Theme, ThemeContext } from './themeContext'
import { getCssVariable } from '../../helpers/getCssVariable'
import {
	getComponentMapFromLocalStorage,
	LS,
	setBlocksMapToLocalStorage,
} from '../../helpers/localStorage/localStorage'
import { StorageUnits } from '../../helpers/localStorage/storageUnits'

const DEFAULT_CONTROL = ControlIds.themes

const DEFAULT_THEME = {
	color: getCssVariable('--ft-color-white'),
	backgroundColor: getCssVariable('--ft-color-blue'),
}

export const MainPage = () => {
	const [activeControlId, setActiveControlId] = useState<string>(DEFAULT_CONTROL)
	const [blocks, setBlocks] = useState<Map<BlockId, Block>>(new Map<BlockId, Block>())
	const [activeBlock, setActiveBlock] = useState<Block | null>()
	const [theme, setTheme] = useState<Theme>()

	useEffect(() => {
		if (theme) {
			LS.set(StorageUnits.THEME, theme)
		}
	}, [theme])

	useEffect(() => {
		getComponentMapFromLocalStorage<BlockId, Block>(StorageUnits.BLOCKS).then((blocks) => {
			if (blocks) {
				setBlocks(blocks)
			}
		})
		LS.get(StorageUnits.THEME).then((theme) => {
			if (theme) {
				setTheme(theme)
			}
		})
	}, [])

	const handleAddBlock = useCallback(
		(newBlock: Block) => {
			if (!newBlock.id) {
				// TODO подумать над хэш функцйией
				const newId = String(Math.round(Math.random() * 90000000000))
				newBlock.id = newId
			}
			const newBlocksMap = new Map(blocks.set(newBlock.id, newBlock))
			setBlocks(newBlocksMap)
			setBlocksMapToLocalStorage(StorageUnits.BLOCKS, newBlocksMap)
			setActiveBlock(newBlock)
		},
		[blocks],
	)

	const handleDeleteBlock = useCallback(
		(blockId: BlockId | undefined | null) => {
			if (blockId) {
				blocks.delete(blockId)
				const newBlocksMap = new Map(blocks)
				setBlocks(newBlocksMap)
				setBlocksMapToLocalStorage(StorageUnits.BLOCKS, newBlocksMap)
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
		<ThemeContext.Provider value={{ theme: theme || DEFAULT_THEME, onThemeChange: setTheme }}>
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
		</ThemeContext.Provider>
	)
}
