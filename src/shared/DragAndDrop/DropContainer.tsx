import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { DragAndDropItemTypes } from './DragAndDropItemTypes';

export interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
}

function DropContainer({
  children,
  className,
  style,
  onDrag,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onDrag?: (item: DragItem, monitor: DropTargetMonitor) => void;
}) {
  const [, drop] = useDrop({
    accept: DragAndDropItemTypes.BOX,
    hover: onDrag,
  });

  return (
    <div ref={drop} className={className} style={style}>
      {children}
    </div>
  );
}

export default DropContainer;
