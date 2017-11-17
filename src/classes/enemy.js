import Item from './item';
import CollisionDetection from './collision_detection';

class Enemy extends Item {
	constructor({x, y, width, height, color, xRange = [], yRange = [], speed = 0, onCollision}) {
		super({
			x: xRange.length ? x || xRange[0] : x,
			y: yRange.length ? y || yRange[0] : y,
			width,
			height,
			color
		});

		this.xRange = xRange;
		this.yRange = yRange;

		this.xSpeed = speed;
		this.ySpeed = speed;

		this.onCollision = onCollision;
	}

	tick(level) {
		if(this.xRange.length) {
			const xUpdate = this.getPositionAndSpeed(this.x, this.xSpeed, this.xRange[0], this.xRange[1])
			this.x = xUpdate.position;
			this.xSpeed = xUpdate.speed;
		}

		if(this.yRange.length) {
			const yUpdate = this.getPositionAndSpeed(this.y, this.ySpeed, this.yRange[0], this.yRange[1])
			this.y = yUpdate.position;
			this.ySpeed = yUpdate.speed;
		}

		this.checkCollisionWithPlayer(level);
	}

	getPositionAndSpeed(position, speed, boundryStart, boundryEnd) {
		position += speed;

		if(position < boundryStart) {
			position = boundryStart;
			speed = -1 * speed;

		} else if(position > boundryEnd) {
			position = boundryEnd;
			speed = -1 * speed;
		}

		return {position, speed};
	}


	checkCollisionWithPlayer(level) {
		const intersecting = CollisionDetection.doPolygonsIntersect(level.player.getCorners(), this.getCorners());

		if(intersecting) {
			this.onCollision();
		}
	}

	draw(ctx) {
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.restore();
	}

	getCorners() {
		return [
			{x: this.x, y: this.y}, 					// top left
			{x: this.x + this.w, y: this.y}, 			// top right
			{x: this.x + this.w, y: this.y + this.h}, 	// bottom right
			{x: this.x, y: this.y + this.h}, 			// bottom left
		];
	}
}

export default Enemy;