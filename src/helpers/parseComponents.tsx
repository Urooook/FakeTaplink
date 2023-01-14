import { Block, CompoentNames } from '../Pages/MainPage/blocksContext'
import { TextBlock } from '../Pages/MainPage/components/blocks/TextBlock/TextBlock'
import { LinkBlock } from '../Pages/MainPage/components/blocks/LinkBlock/LinkBlock'
import {HtmlBlock} from "../Pages/MainPage/components/blocks/HtmlBlock/HtmlBlock";

export const getComponentFromComponentNames = (block: Block): Block => {
	if (!block.componentName) {
		return block
	}
	const Component = components[block.componentName]
	// @ts-ignore
	return { ...block, component: <Component {...block.value} /> }
}

const components = {
	[CompoentNames.TextBlock]: TextBlock,
	[CompoentNames.LinkBlock]: LinkBlock,
	[CompoentNames.HtmlLink]: HtmlBlock,
}
