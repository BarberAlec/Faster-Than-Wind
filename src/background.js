// reference canvas tag from html, make it the width and height of window
const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;  
// set canvas type as 2d
const ctx = canvas.getContext('2d');

const top_y = height * 0.02;
const bottom_y = height * 0.96;
const left_x = width * 0.02;
const right_x = width * 0.96;

const enemy_border_percent_x = .30;
const enemy_border_percent_y = .70; 

// make canvas black 
ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

// fill inside game border grey 
ctx.fillStyle = 'rgb(128,128,128)';
ctx.fillRect(left_x, top_y, right_x-left_x, bottom_y-top_y);

// game border
ctx.lineWidth = 5;
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.strokeRect(
    left_x,
    top_y,
    right_x - left_x, 
    bottom_y - top_y
);

// enemy canvas border
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.strokeRect(
    right_x,
    top_y,
    - (right_x - left_x) * enemy_border_percent_x, 
    (bottom_y - top_y) * enemy_border_percent_y
);


// BUTTONS

// var button = document.createElement("button");
// button.innerHTML = "Do Something";

// var body = document.getElementsByTagName("body")[0];
// body.appendChild(button);

// // 3. Add event handler
// button.addEventListener ("click", function() {
//   alert("did something");
// });

