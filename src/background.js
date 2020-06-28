// reference canvas tag from html, make it the width and height of window
const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;  
// set canvas type as 2d
const ctx = canvas.getContext('2d');

// make canvas black 
ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

// red rectangle
ctx.fillStyle = 'rgb(255, 0, 0)';
ctx.fillRect(50, 50, 100, 150);

// green semi-transparent rectangle
ctx.fillStyle = 'rgba(0, 255, 0, .5)';
ctx.fillRect(75, 75, 100, 100);

let left_top_corner_x = canvas.width * 0.02;
let right_top_corner_x = canvas.width * 0.96;
let left_top_corner_y = canvas.height * 0.02;
let right_top_corner_y = canvas.height * 0.96;

ctx.lineWidth = 5;
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.strokeRect(
    0.02*canvas.width,
    0.02*canvas.height,
    canvas.width - 0.08*canvas.width, 
    canvas.height - 0.08*canvas.height);