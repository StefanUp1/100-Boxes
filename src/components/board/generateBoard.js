import Square from './square';

/**
 * Matrix representing canvas square fields.
 * @const {array}
 *
 */
const fields = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/**
 * Function that create an array
 * of 'Square' objects from
 * a 'fields' matrix.
 *
 * @return {array} Array of board squares
 *
 */
export default function generateBoard() {
	const squareArray = [];

	fields.forEach((row, rowIndex) => {
		row.forEach((square, squareIndex) => {
			const position = {
				x: (rowIndex * window.innerHeight) / 10,
				y: (squareIndex * window.innerHeight) / 10,
			};

			const indexes = {
				x: rowIndex,
				y: squareIndex,
			};

			squareArray.push(new Square(position, indexes));
		});
	});
	
	return squareArray;
}
