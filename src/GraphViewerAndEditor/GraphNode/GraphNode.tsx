import React, { useState } from 'react';
import { GraphNodeModal } from './GraphNodeModal';
import DataBox from '../../shared/DataBox/DataBox';
import { Vertex, VertexPosition } from '../../graphTypes';
import Draggable from '../../shared/DragAndDrop/Draggable';

function GraphNode(
  {
    vertex,
    position,
    editMode,
    height,
    onConnect,
    onDisconnect,
    onDelete,
    isConnected,
  }: {
    vertex: Vertex;
    position: VertexPosition | undefined;
    editMode: boolean;
    height?: number;
    onConnect: React.MouseEventHandler;
    onDisconnect: React.MouseEventHandler;
    onDelete: React.MouseEventHandler;
    isConnected: boolean;
  },
  ref: React.Ref<HTMLDivElement>
) {
  const [isModalOpen, setModalOpen] = useState(false);

  const left = position ? position.x : 0;
  const top = height == null && position ? position.y : 0;

  return (
    <>
      <NodeContainer
        ref={ref}
        editMode={editMode}
        id={vertex.name}
        left={left}
        top={top}
        style={{ height: height || undefined }}
      >
        <DataBox title={vertex.name} onClick={() => setModalOpen(true)}>
          {!editMode ? (
            <>{Array.from({ length: vertex.rate }).map(() => '⭐')}</>
          ) : (
            <div
              style={{
                display: 'flex',
              }}
            >
              <div style={{ marginRight: 8 }}>
                {!isConnected ? (
                  <button
                    style={{ padding: '5px 4px' }}
                    onClick={e => {
                      e.stopPropagation();
                      onConnect(e);
                    }}
                  >
                    Connect
                  </button>
                ) : (
                  <button
                    style={{
                      padding: '5px 4px',
                      color: 'yellow',
                      borderColor: 'yellow',
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      onDisconnect(e);
                    }}
                  >
                    Disconnect
                  </button>
                )}
              </div>

              <div>
                <button
                  style={{
                    padding: '5px 4px',
                    color: 'red',
                    borderColor: 'red',
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(e);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </DataBox>
      </NodeContainer>

      <GraphNodeModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        vertex={vertex}
      />
    </>
  );
}

const NodeContainer = React.forwardRef(function(
  {
    children,
    editMode,
    id,
    left,
    top,
    style,
  }: {
    children: React.ReactNode;
    editMode: boolean;
    id: string;
    left: number;
    top: number;
    style: React.CSSProperties;
  },
  ref: React.Ref<HTMLDivElement>
) {
  return editMode ? (
    <Draggable
      ref={ref}
      id={id}
      left={left}
      top={top}
      style={{ ...style, position: 'absolute', top, left }}
    >
      {children}
    </Draggable>
  ) : (
    <div ref={ref} style={{ ...style, position: 'absolute', top, left }}>
      {children}
    </div>
  );
});

export default React.memo(React.forwardRef(GraphNode));
