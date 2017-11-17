import Item from './item';
import CollisionDetection from './collision_detection';
import KeyboardManager from './keyboard_manager';

class Player extends Item {
	constructor({x, y}) {
		super({
			x: x,
			y: y,
			width: 140,
			height: 20,
			color: 'white'
		});

		this.angle = 0;
		this.speed = 5;

		this.keyboardManager = new KeyboardManager();
	}

	tick(level) {
		this.angle -= (Math.PI * 2) / 180;

		const pressedKeys = this.keyboardManager.getPressedKeys();
		
		if(pressedKeys) {
			if(pressedKeys.indexOf('left') > -1) {
				this.x -= this.speed;
			}
			
			if(pressedKeys.indexOf('top') > -1) {
				this.y -= this.speed;
			}
			
			if(pressedKeys.indexOf('right') > -1) {
				this.x += this.speed;
			}
			
			if(pressedKeys.indexOf('bottom') > -1) {
				this.y += this.speed;
			}	
		}
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
		ctx.rotate(this.angle);
		ctx.fillStyle = this.color;
		ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
		ctx.restore();
	}

	getCorners() {
		const topCenter = CollisionDetection.getPoint(
			this.x + this.w / 2,  
			this.y + (this.h / 2), 
			this.w / 2, 
			this.angle
		);
		
		const bottomCenter = CollisionDetection.getPoint(
			this.x + this.w / 2,  
			this.y + (this.h / 2), 
			-this.w / 2,
			this.angle
		);

		const centerOffset = this.h / 2;
		const leftCorners = this.getCornersForSide(topCenter, bottomCenter, -centerOffset);
		const rightCorners = this.getCornersForSide(topCenter, bottomCenter, centerOffset);

		const corners = leftCorners.concat(rightCorners);
		return corners;
	}

	getCornersForSide(topCenter, bottomCenter, offsetPixels) {
		const p1 = {
			x: topCenter[0] + offsetPixels * (bottomCenter[1] - topCenter[1]) / this.w,
			y: topCenter[1] + offsetPixels * (topCenter[0] - bottomCenter[0]) / this.w
		};

		const p2 = {
			x: bottomCenter[0] + offsetPixels * (bottomCenter[1] - topCenter[1]) / this.w,
			y: bottomCenter[1] + offsetPixels * (topCenter[0] - bottomCenter[0]) / this.w
		}
		
		return [p1, p2];
	}
}

export default Player;