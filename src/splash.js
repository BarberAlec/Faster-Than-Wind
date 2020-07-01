var canvas = document.querySelector('.myCanvas');

const width = canvas.width = window.innerWidth;
const height = canvas.height = (9/16)*width;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);
