import { Point } from '../graphTypes';

export function computeConnectingPoints(rect: ClientRect): Point[] {
  return [
    { x: (rect.left + rect.right) / 2, y: rect.top }, // Top
    { x: rect.right, y: (rect.top + rect.bottom) / 2 }, // Right
    { x: (rect.left + rect.right) / 2, y: rect.bottom }, // Bottom
    { x: rect.left, y: (rect.top + rect.bottom) / 2 }, // Left
  ];
}
