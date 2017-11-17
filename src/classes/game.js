import LevelManager from './level_manager';

class Game {
	constructor({
		canvas = {}
	}) {

		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.stageProps = {
			width: canvas.width,
			height: canvas.height
		};

		const gameActions = {
			start: this.start.bind(this),
			restart: this.restart.bind(this),
			end: this.end.bind(this)
		};

		this.levelManager = new LevelManager({
			gameActions
		});

		this.start();
	}

	start() {
		this.levelManager.showIntro();
		this.tick();
	}

	restart() {
		this.levelManager.restartLevel();
		this.tick();
	}

	end() {
		this.levelManager.showOutro();
		this.tick();
	}

	tick() {
		const currentLevel = this.levelManager.getCurrentLevel();
		currentLevel.tick(this.stageProps);
	}

	draw() {
		const currentLevel = this.levelManager.getCurrentLevel();
		this.ctx.clearRect(0, 0, this.stageProps.width, this.stageProps.height);
		currentLevel.draw(this.ctx);
	}
}

export default Game;