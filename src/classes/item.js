class Item {
	constructor({x, y, height, width, color}) {
		this.x = x;
		this.y = y;

		this.height = height;
		this.width = width;

		this.color = color;
	}

	get h() {
		return this.height;
	}

	get w() {
		return this.width;
	}

	tick(level) {
		throw new Exception('tick() needs to be implemented.');
	}

	draw(ctx) {
		throw new Exception('draw() needs to be implemented.');
	}

	getCorners() {
		return [];	
	}
}

export default Item;