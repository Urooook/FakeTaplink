import React from 'react';
import { withVisitor } from '../../../helpers/visitor';

interface DraggableElementProps {
  ctx: any,
  elem: any
  id?: number
}

const DraggableElementShell = ({ ctx, elem, id }: DraggableElementProps) => (
    <div
        id={`${id}`}
        className="items"
        draggable
        ref={ctx}
        onClick={ctx.emit.bind(null, 'click')}
        onDragStart={ctx.emit.bind(null, 'dragstart')}
        onDragEnd={ctx.emit.bind(null, 'dragend')}
    >
      {elem}
    </div>
);

export const DraggableElement = withVisitor(DraggableElementShell);
