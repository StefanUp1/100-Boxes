import { fabric } from 'fabric';

/**
 * @const {object}
 */
const [score, canvas] = [document.querySelector('#score'), new fabric.Canvas('canvas')];

export default [score, canvas];
