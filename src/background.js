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
const game_width = right_x - left_x;
const game_height = bottom_y - top_y;

const enemy_border_percent_x = 0.30;
const enemy_border_percent_y = 0.70;

function make_background(background_image = false) {

    function make_game_boarder() {
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.strokeRect(
        left_x,
        top_y,
        right_x - left_x,
        bottom_y - top_y
    );
    }

    function make_enemy_boarder() {
        // enemy canvas border
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.strokeRect(
            right_x,
            top_y,
            - (right_x - left_x) * enemy_border_percent_x,
            (bottom_y - top_y) * enemy_border_percent_y
        );
    };

    // make canvas black
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);

    if (background_image != false) {
        var img = new Image();
        img.src = background_image;
        // Make sure the image is loaded first otherwise nothing will draw.
        img.onload = function(){
            ctx.drawImage(img,left_x,top_y,game_width,game_height);   
            make_game_boarder()
            make_enemy_boarder()
        };
    } else {
        // fill inside game border grey
        ctx.fillStyle = "rgb(128,128,128)";
        ctx.fillRect(left_x, top_y, right_x-left_x, bottom_y-top_y);
        make_game_boarder()
        make_enemy_boarder()
    };
};


var imgs = ["https://storage.needpix.com/rsynced_images/blue-water-background-1469968966zou.jpg",
"https://motionarray.imgix.net/preview-271538-Xv2F78jbu7-high_0005.jpg?w=660&q=60&fit=max&auto=format",
"https://jooinn.com/images/turquoise-ocean-background-1.png",
"https://p0.pikist.com/photos/485/499/sea-background-water-surface-texture-wave-blue-summer-ocean-thumbnail.jpg",
"https://wallpapersko.com/wp-content/uploads/ktz/sea-background-nu848hra0494rxlj0l9mzohs7s9z0393jawif7zbbi.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTar3hJiyps62O6_tBi6p-P6ulxEO298gX90Ug-0lxu5haStn-t&s",
"https://www.carbonbrief.org/wp-content/uploads/2019/09/Blue-green-sea-surface-background-with-fishes-full-frame-composition-DWGX61-1550x804.jpg"];


// make_background("https://storage.needpix.com/rsynced_images/blue-water-background-1469968966zou.jpg");
make_background();