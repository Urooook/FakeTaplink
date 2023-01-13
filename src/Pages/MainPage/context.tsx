import { createContext, ReactNode } from 'react'

export type Block = ComponentBlock<TextBlockProps | LinkBlockProps>

export type ComponentBlock<T> = { id?: BlockId; component: ReactNode; value: T }

export type TextBlockProps = {
	text: string
}

export type LinkBlockProps = {
	text: string
	link: string
}

export type BlockId = string

export type BlockContextValue = {
	blocks: Map<BlockId, Block>
	activeBlock?: Block | null
	onAddBlock?: (newBlock: Block) => void
	onDeleteBlock?: (blockId: BlockId | undefined | null) => void
	onChangeActiveBlock?: (activeBlock: Block | null) => void
}

export const BlocksContext = createContext<BlockContextValue>({
	blocks: new Map<BlockId, Block>(),
})
