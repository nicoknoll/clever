import Level from './level';
import TextIntro from './text_intro';
import TextOutro from './text_outro';
import TextLevel from './text_level';

class LevelManager {
	constructor({
		gameActions = {}
	}) {
		this.levels = this.loadLevels();

		this.currentLevel = {};
		this.currentLevelIndex = -1;

		this.gameActions = gameActions;
	}

	loadLevels() {
		// dynamically loading all levels
		const context = require.context("../levels/", true, /\.json$/);
		const levels = [];

		// we need the level names to be sorted numerically
		const levelNames = context.keys();

		levelNames.sort((a, b) => {
			a = this._levelNameToNumber(a);
			b = this._levelNameToNumber(b);

			return a - b;
		});

		// fill the levels object with the loaded data
		levelNames.forEach((key) => {
		    levels.push(context(key));
		});

		return levels;
	}

	_levelNameToNumber(levelName) {
		levelName = levelName.replace('./', '');
		levelName = levelName.replace('.json', '');
		levelName = parseInt(levelName);

		return levelName;
	}

	restartLevel() {
		this.gotoLevel(this.currentLevelIndex);
	}

	nextLevel() {
		this.currentLevelIndex += 1;
		this.gotoLevel(this.currentLevelIndex, true);
	}

	gotoLevel(levelNumber, showLevelIntro = false) {
		const numLevels = this.levels.length;

		if(numLevels > levelNumber) {
			this.currentLevelIndex = levelNumber;

			if(showLevelIntro) {
				this.currentLevel = new TextLevel({
					text: 'Level ' + (this.currentLevelIndex + 1),
					nextAction: this.gotoLevel.bind(this, this.currentLevelIndex)
				});
			} else {
				const endAction = this.gameActions.end;
				const nextAction =  this.nextLevel.bind(this);
				const goalAction = (numLevels == levelNumber + 1) ? endAction : nextAction;

				const level = this.levels[this.currentLevelIndex];
				level.onEnemyCollision = this.gameActions.restart;
				level.onGoalCollision = goalAction;

				this.currentLevel = new Level(level);
			}

		} else {
			console.error('Invalid level number');
		}
	}

	showIntro() {
		this.currentLevel = new TextIntro({
			nextAction: this.gotoLevel.bind(this, 0, true)
		});
	}

	showOutro() {
		this.currentLevel = new TextOutro({
			nextAction: this.gameActions.start
		});
	}

	getCurrentLevel() {
		return this.currentLevel;
	}
}

export default LevelManager;