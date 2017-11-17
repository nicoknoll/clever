import Game from './classes/game';

window.onload = () => {
	const canvas = document.getElementById("canvas");
	const game = new Game({
		canvas
	});

	function tick(time){
		requestAnimationFrame(tick);
		game.tick();
		game.draw();
	}

	requestAnimationFrame(tick);
};