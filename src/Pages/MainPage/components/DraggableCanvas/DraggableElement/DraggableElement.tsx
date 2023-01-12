import React from 'react'
import { withVisitor } from '../../../../../helpers/visitor'
import styles from './DraggableElement.module.css'

interface DraggableElementProps {
	ctx: any
	elem: any
}

const DraggableElementShell = ({ ctx, elem }: DraggableElementProps) => (
	<div
		className={styles.item}
		draggable
		ref={ctx}
		onClick={ctx.emit.bind(null, 'click')}
		onDragStart={ctx.emit.bind(null, 'dragstart')}
		onDragEnd={ctx.emit.bind(null, 'dragend')}
	>
		{elem}
	</div>
)

export const DraggableElement = withVisitor(DraggableElementShell)
