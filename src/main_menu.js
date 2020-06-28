// reference canvas tag from html, make it the width and height of window
const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
// set canvas type as 2d
const ctx = canvas.getContext('2d');

// make canvas black
ctx.fillStyle = 'rgb(0, 105, 148)';
ctx.fillRect(0, 0, width, height);

function draw() {
    text('Test',20,40);
}

