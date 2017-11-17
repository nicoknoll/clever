class KeyboardMananger {
	constructor() {
		this.keyMapping = {
			13: 'enter',
			37: 'left',
			38: 'top',
			39: 'right',
			40: 'bottom'
		};
		this._pressedKeys = [];

		document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
		document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
	}

	keyDownHandler(e) {
		this._pressedKeys.push(this.keyMapping[e.keyCode]);
	}

	keyUpHandler(e) {
		this._pressedKeys = this._pressedKeys.filter((key) => { 
			return key !== this.keyMapping[e.keyCode]; 
		});
	}

	getPressedKeys() {
		return this._pressedKeys;
	}
}

export default KeyboardMananger;