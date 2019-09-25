import { fabric } from 'fabric';
import colors from '../../constants/colors';
import elements from '../../constants/elements';

/**
 * @const {object}
 */
const [, canvas] = elements;

/**
 * @const {string}
 */
const [, , colorDefault] = colors;

/** Class representing a single Square. */
export default class Square {
	/**
	 * Create a square.
	 * @param {object} position - The position value.
	 * @param {object} index - The index value.
	 *
	 */
	constructor(position, index) {
		this.clickable = true;
		this.clicked = false;
		this.width = window.innerHeight / 10;
		this.height = window.innerHeight / 10;
		this.color = colorDefault;
		this.position = {
			x: position.x,
			y: position.y,
		};
		this.index = {
			x: index.x,
			y: index.y,
		};
	}
	
	/** Draw the single Square on canvas. */
	draw() {
		/**
		 * @const {object}
		 */
		const rect = new fabric.Rect({
			top: this.position.y,
			left: this.position.x,
			width: this.width,
			height: this.height,
			fill: this.color,
			stroke: '#000',
			strokeWidth: 0.2,
			selectable: false,
		});
		
		canvas.add(rect);
	}
}
