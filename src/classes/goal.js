import Item from './item';
import CollisionDetection from './collision_detection';

class Goal extends Item {
	constructor({x, y, onCollision}) {
		super({
			x: x,
			y: y,
			width: 30,
			height: 30,
			color: 'white'
		});

		this.onCollision = onCollision;
	}

	tick(level) {
		this.checkCollisionWithPlayer(level);
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
		ctx.fillRect(this.x, this.y, 30, 15);
		ctx.restore();

		ctx.save();
		ctx.beginPath();
		ctx.moveTo(this.x + 30, this.y + 30);
		ctx.lineTo(this.x + 30, this.y + 1);
		ctx.lineTo(this.x + 1, this.y + 1);
		ctx.lineTo(this.x + 1, this.y + 15);
		ctx.lineTo(this.x + 30, this.y + 15);
		ctx.closePath();
		ctx.lineWidth = 4;
		ctx.strokeStyle = this.color;
		ctx.stroke();
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

export default Goal;