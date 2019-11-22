import { Point } from '../graphTypes';

type ContainerRectTopLeft = { containerTop: number; containerLeft: number };

export function computeConnectingPoints(
  rect: ClientRect,
  { containerTop, containerLeft }: ContainerRectTopLeft
): Point[] {
  rect = addParentContainerOffset(rect, { containerTop, containerLeft });

  return [
    { x: (rect.left + rect.right) / 2, y: rect.top }, // Top
    { x: rect.right, y: (rect.top + rect.bottom) / 2 }, // Right
    { x: (rect.left + rect.right) / 2, y: rect.bottom }, // Bottom
    { x: rect.left, y: (rect.top + rect.bottom) / 2 }, // Left
  ];
}

// Shifts computation of connecting points relatively to parent container
function addParentContainerOffset(
  rect: ClientRect,
  { containerTop, containerLeft }: ContainerRectTopLeft
): ClientRect {
  return {
    top: rect.top - containerTop,
    right: rect.right - containerLeft,
    bottom: rect.bottom - containerTop,
    left: rect.left - containerLeft,
    height: rect.height,
    width: rect.width,
  };
}
