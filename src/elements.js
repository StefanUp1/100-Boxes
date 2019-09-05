import './style.css';
import { fabric } from 'fabric';

const score = document.querySelector('#score');
const canvas = new fabric.Canvas('canvas');

const elements = [
	score,
	canvas,
];

export default elements;
