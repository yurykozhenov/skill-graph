import React, { useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragAndDropItemTypes } from './DragAndDropItemTypes';

export interface DraggableProps {
  id: any;
  left: number;
  top: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function Draggable(
  { id, left, top, children, style }: DraggableProps,
  forwardedRef: React.Ref<any>
) {
  const [, drag, preview] = useDrag({
    item: { id, left, top, type: DragAndDropItemTypes.BOX },
  });

  preview(getEmptyImage());

  const ref = useCallback(
    (node: HTMLDivElement) => {
      drag(node);

      if (forwardedRef && typeof forwardedRef === 'function') {
        forwardedRef(node);
      }
    },
    [drag, forwardedRef]
  );

  return (
    <div
      ref={ref}
      style={{ ...style, position: 'absolute', cursor: 'move', left, top }}
    >
      {children}
    </div>
  );
}

export default React.forwardRef(Draggable);
