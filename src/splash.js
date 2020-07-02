var canvas = document.getElementById("screen");

const game_width = canvas.width = window.innerWidth;
const game_height = canvas.height = (9/16)*game_width;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, game_width, game_height);

function draw_logo() {
    logo = new Image();
    logo.src = '../assets/img/logo.png';
    logo.onload = function () {
        ctx.drawImage(logo, (canvas.width - logo.width)/2, (game_height - logo.height)/4);
    };
}
draw_logo();
