import Level from './level';
import KeyboardManager from './keyboard_manager';

const LEVEL_BACKGROUND_COLOR = '#0380ff';

class Text {
	constructor({
		text = '',
		nextAction = () => {},
		stageProps = {}
	}) {
		// for blinking button
		this.buttonTicks = 0;
		this.showButton = true;

		this.keyboardManager = new KeyboardManager();

		this.text = text;
		this.nextAction = nextAction;

		this.stageProps = stageProps;
	}

	tick(stageProps) {
		this.stageProps = stageProps;

		const pressedKeys = this.keyboardManager.getPressedKeys();
		
		if(pressedKeys) {
			if(pressedKeys.indexOf('enter') > -1) {
				this.nextAction();
			}
		}
	}

	drawTextWithShadow({
		ctx,
		text = '',
		size = 20,
		top = 0,
		shadowSpacing = 0
	}) {
		const font = size.toString() + 'px pixel';

		ctx.save();
		ctx.textAlign = 'center'; 
		ctx.font = font;
		ctx.strokeStyle = 'white';
		ctx.strokeText(text, 400 - shadowSpacing, top + shadowSpacing);
		ctx.restore();

		ctx.save();
		ctx.textAlign = 'center'; 
		ctx.font = font;
		ctx.fillStyle = 'white';
		ctx.fillText(text, 400, top);
		ctx.restore();
	}

	drawPressEnterButton({
		ctx, 
		top = 0
	}) {
		this.buttonTicks += 1;
		const displayTicks = 50;

		if(this.buttonTicks > displayTicks) {
			this.showButton = false;
		}

		if(this.buttonTicks > (displayTicks * 2)) {
			this.showButton = true;
			this.buttonTicks = 0;
		}

		if(this.showButton) {
			this.drawTextWithShadow({
				ctx,
				text: 'press enter',
				size: 30,
				top,
				shadowSpacing: 2
			});
		}
	}

	draw(ctx) {
		ctx.save();
		ctx.fillStyle = LEVEL_BACKGROUND_COLOR;
		ctx.fillRect(0, 0, this.stageProps.width, this.stageProps.height);
		ctx.restore();
	}
}

export default Text;