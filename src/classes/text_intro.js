import Text from './text';

class TextIntro extends Text {
	draw(ctx) {
		super.draw(ctx);

		this.drawTextWithShadow({
			ctx,
			text: 'Clever',
			size: 90,
			top: 200,
			shadowSpacing: 4
		});

		this.drawTextWithShadow({
			ctx,
			text: 'remastered',
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

export default TextIntro;