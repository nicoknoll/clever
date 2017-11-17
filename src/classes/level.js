import Player from './player';
import Enemy from './enemy';
import Goal from './goal';

const LEVEL_BACKGROUND_COLOR = '#0380ff';

class Level {
	constructor({
		player = {}, 
		goal = {}, 
		enemies = [], 
		onEnemyCollision = () => {}, 
		onGoalCollision = () => {},
		stageProps = {}
	}) {
		this.player = new Player(player);

		this.enemies = enemies.map(function(enemy) {
			enemy.onCollision = onEnemyCollision;
			return new Enemy(enemy);
		});

		goal.onCollision = onGoalCollision;
		this.goal = new Goal(goal);

		this.onPlayerOutofLevel = onEnemyCollision;

		this.stageProps = stageProps;
	}

	tick(stageProps) {
		const level = this;

		this.stageProps = stageProps;
		this.checkPlayerInLevel(stageProps);

		// do all the ticks and pass the level so items 
		// can check for other items and collisions themselves
		this.enemies.forEach(function(enemy) {
			enemy.tick(level);
		});
		this.goal.tick(level);
		this.player.tick(level);
	}

	checkPlayerInLevel(stageProps) {
		const playerCenter = {
			x: this.player.x + this.player.w / 2,
			y: this.player.y + this.player.h / 2
		}

		if (playerCenter.x < 0 || 
			playerCenter.x > stageProps.width || 
			playerCenter.y < 0 || 
			playerCenter.y > stageProps.height
		) {
			this.onPlayerOutofLevel();
		}
	}

	draw(ctx) {
		ctx.save();
		ctx.fillStyle = LEVEL_BACKGROUND_COLOR;
		ctx.fillRect(0, 0, this.stageProps.width, this.stageProps.height);
		ctx.restore();

		// tick all the other draws as well
		this.enemies.forEach(function(enemy) {
			enemy.draw(ctx);
		});
		this.goal.draw(ctx);
		this.player.draw(ctx);
	}
}

export default Level;