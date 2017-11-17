class CollisionDetection {
	static getPoint(x, y, radius, angle) {
		return [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius];
	}

	static isIntersectingLines(a, b, c, d){
		var denominator = ((b.X - a.X) * (d.Y - c.Y)) - ((b.Y - a.Y) * (d.X - c.X));
		var numerator1 = ((a.Y - c.Y) * (d.X - c.X)) - ((a.X - c.X) * (d.Y - c.Y));
		var numerator2 = ((a.Y - c.Y) * (b.X - a.X)) - ((a.X - c.X) * (b.Y - a.Y));

		// Detect coincident lines
		if (denominator == 0) return numerator1 == 0 && numerator2 == 0;

		var r = numerator1 / denominator;
		var s = numerator2 / denominator;

		return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
	}

	/**
	 * Helper function to determine whether there is an intersection between the two polygons described
	 * by the lists of vertices. Uses the Separating Axis Theorem
	 *
	 * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
	 * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
	 * @return true if there is any intersection between the 2 polygons, false otherwise
	 */
	static doPolygonsIntersect (a, b) {

		function isUndefined(obj){
			return obj === void 0;
		}

		var polygons = [a, b];
		var minA, maxA, projected, i, i1, j, minB, maxB;

		for (i = 0; i < polygons.length; i++) {

			// for each polygon, look at each edge of the polygon, and determine if it separates
			// the two shapes
			var polygon = polygons[i];
			for (i1 = 0; i1 < polygon.length; i1++) {

				// grab 2 vertices to create an edge
				var i2 = (i1 + 1) % polygon.length;
				var p1 = polygon[i1];
				var p2 = polygon[i2];

				// find the line perpendicular to this edge
				var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

				minA = maxA = undefined;
				// for each vertex in the first shape, project it onto the line perpendicular to the edge
				// and keep track of the min and max of these values
				for (j = 0; j < a.length; j++) {
					projected = normal.x * a[j].x + normal.y * a[j].y;
					if (isUndefined(minA) || projected < minA) {
						minA = projected;
					}
					if (isUndefined(maxA) || projected > maxA) {
						maxA = projected;
					}
				}

				// for each vertex in the second shape, project it onto the line perpendicular to the edge
				// and keep track of the min and max of these values
				minB = maxB = undefined;
				for (j = 0; j < b.length; j++) {
					projected = normal.x * b[j].x + normal.y * b[j].y;
					if (isUndefined(minB) || projected < minB) {
						minB = projected;
					}
					if (isUndefined(maxB) || projected > maxB) {
						maxB = projected;
					}
				}

				// if there is no overlap between the projects, the edge we are looking at separates the two
				// polygons, and we know there is no overlap
				if (maxA < minB || maxB < minA) {
					return false;
				}
			}
		}
		return true;
	};
}

export default CollisionDetection;