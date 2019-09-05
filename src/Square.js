import { fabric } from 'fabric';
import colors from './colors';
import elements from './elements';

const [, canvas] = elements;
const [, , colorDefault] = colors;

export default class Square {
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
	
	draw() {
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
