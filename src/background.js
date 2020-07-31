// reference canvas tag from html, make it the width and height of window
var canvas = document.querySelector('.myCanvas');
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


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function make_background(gen_graphics = false, background_image = false) {

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
        if (gen_graphics) {
            var img = new Image();
            img.src = background_image;
            //img.width = 0.02 * game_width;
            //img.style.height = 'auto';
            // Make sure the image is loaded first otherwise nothing will draw.


            img.onload = function(){


                
                // Friendly Ship background
                var tempCanvas = document.createElement("canvas"),
                tCtx = tempCanvas.getContext("2d");
                const pat_scaling = 0.5;
                tempCanvas.width = img.width*pat_scaling;
                tempCanvas.height = img.height*pat_scaling;
                tCtx.drawImage(img,0,0,img.width,img.height,0,0,img.width*pat_scaling, img.height*pat_scaling);
                ctx.rect(left_x, top_y, game_width, game_height);
                ctx.fillStyle = ctx.createPattern(tempCanvas, "repeat");            
                ctx.fill()


                const enemy_ship_ratio = (game_height*enemy_border_percent_y) /
                     (game_width * (1 - enemy_border_percent_x));
                const enemy_pat_scaling = pat_scaling * enemy_ship_ratio;

                var ttempCanvas = document.createElement("canvas"),
                ttCtx = ttempCanvas.getContext("2d");
                ttempCanvas.width = img.width*enemy_pat_scaling;
                ttempCanvas.height = img.height*enemy_pat_scaling;
                ttCtx.drawImage(img,0,0,img.width,img.height,0,0,img.width*enemy_pat_scaling, img.height*enemy_pat_scaling);
                ctx.fillStyle = ctx.createPattern(ttempCanvas, "repeat");            
                // ctx.fillStyle = "rgb(255, 0, 0)";
                ctx.fillRect(right_x-game_width*enemy_border_percent_x,top_y,game_width*enemy_border_percent_x,game_height*enemy_border_percent_y);

                // wait(500);

                // Enemy Ship background
                //ration based of ship lengths

                // var tempCanvas = document.createElement("canvas"),
                // tCtx = tempCanvas.getContext("2d");
                // const enemy_pat_scaling = pat_scaling * enemy_ship_ratio;
                // tempCanvas.width = img.width*enemy_pat_scaling;
                // tempCanvas.height = img.height*enemy_pat_scaling;
                // tCtx.drawImage(img,0,0,img.width,img.height,0,0,img.width*enemy_pat_scaling, img.height*pat_scaling);

                // wait(500);

                // var canvas_tw = document.createElement("canvas"),
                // ctx_tw = canvas_tw.getContext("2d");
                // ctx_tw.width = window.innerWidth;
                // ctx_tw.height = window.innerHeight;
                // canvas_tw.style.zIndex = 10;

                // ctx_tw.fillStyle = "rgb(256,0,0)";
                // ctx_tw.fillRect(0, 0, game_height, game_height);
                // ctx_tw.fill();
                
                // ctx_tw.rect(right_x - game_width*enemy_border_percent_x, top_y, game_width*enemy_border_percent_x, game_height*enemy_border_percent_y);

                // var pat = ctx.createPattern(img, "repeat");
                // ctx.rect(left_x, top_y, game_width, game_height);
                // ctx.fillStyle = pat;
                // ctx.fill();

                make_game_boarder()
                make_enemy_boarder()
            };
        } else {
            var img = new Image();
            img.src = background_image;
            // Make sure the image is loaded first otherwise nothing will draw.
            img.onload = function(){
                ctx.drawImage(img,left_x,top_y,game_width,game_height);   
                make_game_boarder()
                make_enemy_boarder()
            };
        }
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

var img_tiles = ["../assets/img/water_tiled.png"]

// make_background("https://storage.needpix.com/rsynced_images/blue-water-background-1469968966zou.jpg");
make_background(true, img_tiles[0]);