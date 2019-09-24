import { fabric } from 'fabric';
import './style/style.css';
import colors from './constants/colors';
import elements from './constants/elements';
import generateBoard from './components/board/generateBoard';

const [score, canvas] = elements;
const [colorClicked, colorClick, colorDefault] = colors;

canvas.setDimensions({ width: window.innerHeight, height: window.innerHeight });

let boardSquares = [];

function restartGame() {
	boardSquares.forEach((square) => {
		square.clickable = true;
		square.clicked = false;
		square.color = colorDefault;
		score.innerHTML = '0';
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
		// Partial solution using math formula
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
		const rect = new fabric.Rect({
			top: 0,
			left: 0,
			width: window.innerHeight,
			height: window.innerHeight,
			fill: 'rgba(0,0,0,0.7)',
			strokeWidth: 0.2,
			selectable: false,
		});
		canvas.add(rect);

		canvas.add(new fabric.IText('GAME OVER', {
			fontFamily: '28px Arial',
			fill: '#fff',
			textAlign: 'center',
			top: window.innerHeight / 2,
		}));

		canvas.add(new fabric.IText('Press SPACEBAR to play again', {
			fontFamily: '22px Arial #fff',
			fill: '#fff',
			textAlign: 'center',
			top: 40 + window.innerHeight / 2,
		}));
	}

	const numberOfClicks = boardSquares.filter((square) => square.clicked).length;
	score.innerHTML = numberOfClicks;
}

function initCanvasEvents() {
	canvas.on('mouse:down', (event) => {
		const { x, y } = event.absolutePointer;
		
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
	});
}

function initDocumentEvents() {
	document.addEventListener('keydown', (event) => {
		if (event.keyCode === 32) {
			restartGame();
		}
	});
}

function init() {
	boardSquares = generateBoard();
	boardSquares.forEach((square) => {
		square.draw();
	});
	
	initCanvasEvents();
	initDocumentEvents();
}

function initWindowEvents() {
	window.addEventListener('resize', () => {
		canvas.setDimensions({ width: window.innerHeight, height: window.innerHeight });
		init();
	});
}

init();
initWindowEvents();
