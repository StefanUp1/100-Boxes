import colors from './colors';
import elements from './elements';

const [, , ctx] = elements;
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
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
		ctx.lineWidth = '0.2';
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.stroke();
	}
}
