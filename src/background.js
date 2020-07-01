// reference canvas tag from html, make it the width and height of window
var canvas = document.querySelector('.myCanvas');
canvas.style.position = "absolute";
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
// set canvas type as 2d
const ctx = canvas.getContext('2d');

const top_y = height * 0.02;
const bottom_y = height * 0.96;
const left_x = width * 0.02;
const right_x = width * 0.96;

const enemy_border_percent_x = 0.30;
const enemy_border_percent_y = 0.70;

function make_background(use_img = 0, background = 'rgb(128, 128, 128)') {
    // make canvas black
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);

    if (use_img == 1) {
        var img = new Image();
        img.src = background;
        // Make sure the image is loaded first otherwise nothing will draw.
        img.onload = function(){
            ctx.drawImage(img,0,0);   
        };
    } else {
        // fill inside game border grey
        ctx.fillStyle = "rgb(128,128,128)";
        ctx.fillRect(left_x, top_y, right_x-left_x, bottom_y-top_y);
    };

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
};

make_background();