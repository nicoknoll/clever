import Text from './text';

class TextLevel extends Text {
	draw(ctx) {
		super.draw(ctx);

		this.drawTextWithShadow({
			ctx,
			text: this.text,
			size: 40,
			top: 300,
			shadowSpacing: 3
		});

		this.drawPressEnterButton({
			ctx,
			top: 500
		});
	}
}

export default TextLevel;