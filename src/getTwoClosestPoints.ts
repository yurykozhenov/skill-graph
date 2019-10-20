import { Point } from './graphApi';

export function getTwoClosestPoints(
  startPoints: Point[],
  endPoints: Point[]
): [Point, Point] {
  const distances = [];

  for (const startPoint of startPoints) {
    for (const endPoint of endPoints) {
      distances.push(findDistance(startPoint, endPoint));
    }
  }

  const minDistance = Math.min(...distances);
  const minDistanceIndex = distances.findIndex(
    distance => distance === minDistance
  );

  const startIndex = Math.floor(minDistanceIndex / startPoints.length);
  const endIndex = minDistanceIndex % endPoints.length;

  return [startPoints[startIndex], endPoints[endIndex]];
}

function findDistance(startPoint: Point, endPoint: Point) {
  return Math.sqrt(
    (endPoint.x - startPoint.x) ** 2 + (endPoint.y - startPoint.y) ** 2
  );
}
