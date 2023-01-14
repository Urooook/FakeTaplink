import React, { useContext } from 'react'
import { withVisitor } from '../../../../../helpers/visitor'
import './DraggableElement.css'
import { BlockId, BlocksContext } from '../../../blocksContext'

interface DraggableElementProps {
	ctx: any
	elem: any
	elemId: BlockId
}

const DraggableElementShell = ({ ctx, elem, elemId }: DraggableElementProps) => {
	const { activeBlock } = useContext(BlocksContext)

	return (
		<div
			className={`items ${activeBlock?.id === elemId ? 'activeItem' : ''}`}
			draggable
			ref={ctx}
			onClick={ctx.emit.bind(null, 'click')}
			onDragStart={ctx.emit.bind(null, 'dragstart')}
			onDragEnd={ctx.emit.bind(null, 'dragend')}
			id={elemId}
		>
			{elem}
		</div>
	)
}

export const DraggableElement = withVisitor(DraggableElementShell)
