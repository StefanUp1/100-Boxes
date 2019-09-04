import './style.css';

const score = document.querySelector('#score');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const elements = [
	score,
	canvas,
	ctx,
];

export default elements;
