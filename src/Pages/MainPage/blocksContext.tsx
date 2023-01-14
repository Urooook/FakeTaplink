import { createContext, ReactNode } from 'react'

export type Block = ComponentBlock<TextBlockProps | LinkBlockProps | ImageBlockProps>

export enum CompoentNames {
	TextBlock = 'TextBlock',
	LinkBlock = 'LinkBlock',
	HtmlLink = 'HtmlLink',
	ImageLink = 'ImageLink'
}

export type ComponentBlock<T> = {
	value: T
	component: ReactNode
	componentName?: CompoentNames
	id?: BlockId
}

export type TextBlockProps = {
	text: string
}

export type LinkBlockProps = {
	text: string
	link: string
}

export type ImageBlockProps = {
	text?: string
	image: string
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
