import Text from './text';

class TextOutro extends Text {
	draw(ctx) {
		super.draw(ctx);

		this.drawTextWithShadow({
			ctx,
			text: 'Happy',
			size: 90,
			top: 200,
			shadowSpacing: 4
		});

		this.drawTextWithShadow({
			ctx,
			text: 'Birthday',
			size: 90,
			top: 320,
			shadowSpacing: 4
		});

		this.drawPressEnterButton({
			ctx,
			top: 500
		});
	}
}

export default TextOutro;