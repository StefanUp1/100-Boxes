import generateBoard from './generateBoard';
import colors from './colors';
import elements from './elements';

const [score, canvas, ctx] = elements;
const [colorClicked, colorClick, colorDefault] = colors;

canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

const canvasLeft = canvas.offsetLeft;
const canvasTop = canvas.offsetTop;
let boardSquares = [];

function init() {
	boardSquares = generateBoard();
	boardSquares.forEach((square) => {
		square.draw();
	});
}

function restartGame() {
	boardSquares.forEach((square) => {
		square.clickable = true;
		square.clicked = false;
		square.color = colorDefault;
		score.innerHTML = 0;
		square.draw();
	});
}

function update(clickedSquare) {
	if (clickedSquare.clicked || !clickedSquare.clickable) return;
	clickedSquare.clicked = true;
	clickedSquare.clickable = false;
	clickedSquare.color = colorClicked;
	clickedSquare.draw();
	boardSquares.forEach((square) => {
		if (square.clicked) return;
		const { x: squareX, y: squareY } = square.index;
		const { x: clickedSquareX, y: clickedSquareY } = clickedSquare.index;
		// if (
		//   Math.ceil(
		//     Math.pow(clickedSquareX - squareX, 2) +
		//       Math.pow(clickedSquareY - squareY, 2)
		//   ) === Math.pow(3, 2)
		// ) {
		//   square.clickable = true;
		//   square.color = colorClick;
		// } else {
		//   square.clickable = false;
		//   square.color = colorDefault;
		// }
		if (
			squareX === clickedSquareX
			&& (squareY === clickedSquareY + 3 || squareY === clickedSquareY - 3)
		) {
			square.clickable = true;
			square.color = colorClick;
		} else if (
			squareY === clickedSquareY
			&& (squareX === clickedSquareX + 3 || squareX === clickedSquareX - 3)
		) {
			square.clickable = true;
			square.color = colorClick;
		} else if (
			squareY === clickedSquareY - 2
			&& (squareX === clickedSquareX + 2 || squareX === clickedSquareX - 2)
		) {
			square.clickable = true;
			square.color = colorClick;
		} else if (
			squareY === clickedSquareY + 2
			&& (squareX === clickedSquareX + 2 || squareX === clickedSquareX - 2)
		) {
			square.clickable = true;
			square.color = colorClick;
		} else {
			square.clickable = false;
			square.color = colorDefault;
		}
		square.draw();
	});
	
	const clickableSquaresLeft = boardSquares.filter((square) => square.clickable);
	if (!clickableSquaresLeft.length) {
		ctx.rect(0, 0, window.innerHeight, window.innerHeight);
		ctx.fillStyle = 'rgba(0,0,0,0.7)';
		ctx.fill();
		ctx.font = '28px Arial';
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = '22px';
		ctx.fillText('GAME OVER', window.innerHeight / 2, window.innerHeight / 2);
		ctx.fillText(
			'Press SPACEBAR to play again',
			40 + window.innerHeight / 2,
			40 + window.innerHeight / 2
		);
	}
	
	const numberOfClicks = boardSquares.filter((square) => square.clicked).length;
	if (score) {
		score.innerHTML = numberOfClicks;
	}
}

canvas.addEventListener(
	'click',
	(event) => {
		const x = event.pageX - canvasLeft;
		const y = event.pageY - canvasTop;
		boardSquares.forEach((square) => {
			if (
				y > square.position.y
				&& y < square.position.y + square.height
				&& x > square.position.x
				&& x < square.position.x + square.width
			) {
				update(square);
			}
		});
	},
	false
);

window.addEventListener('resize', () => {
	canvas.width = window.innerHeight;
	canvas.height = window.innerHeight;
	init();
});

document.addEventListener('keydown', (event) => {
	switch (event.keyCode) {
	case 32:
		restartGame();
		break;
	default:
	}
});

init();
