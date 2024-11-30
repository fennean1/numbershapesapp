export const getSmoothPathFromPoints = (
    points: Point[],
    correction = 0,
  ): TSimplePathData => {
    let p1 = new Point(points[0]),
      p2 = new Point(points[1]),
      multSignX = 1,
      multSignY = 0;
    const path: TSimplePathData = [],
      len = points.length,
      manyPoints = len > 2;
  
    if (manyPoints) {
      multSignX = points[2].x < p2.x ? -1 : points[2].x === p2.x ? 0 : 1;
      multSignY = points[2].y < p2.y ? -1 : points[2].y === p2.y ? 0 : 1;
    }
    path.push([
      'M',
      p1.x - multSignX * correction,
      p1.y - multSignY * correction,
    ]);
    let i;
    for (i = 1; i < len; i++) {
      if (!p1.eq(p2)) {
        const midPoint = p1.midPointFrom(p2);
        // p1 is our bezier control point
        // midpoint is our endpoint
        // start point is p(i-1) value.
        path.push(['Q', p1.x, p1.y, midPoint.x, midPoint.y]);
      }
      p1 = points[i];
      if (i + 1 < points.length) {
        p2 = points[i + 1];
      }
    }
    if (manyPoints) {
      multSignX = p1.x > points[i - 2].x ? 1 : p1.x === points[i - 2].x ? 0 : -1;
      multSignY = p1.y > points[i - 2].y ? 1 : p1.y === points[i - 2].y ? 0 : -1;
    }
    path.push([
      'L',
      p1.x + multSignX * correction,
      p1.y + multSignY * correction,
    ]);
    return path;
  };