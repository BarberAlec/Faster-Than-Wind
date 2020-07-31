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

class Background{

    constructor(gen_graphics = false, background_image = false){
        self = this;
        this.refresh(gen_graphics, background_image);
    }


    _make_game_boarder() {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.strokeRect(
            left_x,
            top_y,
            right_x - left_x,
            bottom_y - top_y
        );
    }

    _make_enemy_boarder() {
        // enemy canvas border
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.strokeRect(
            right_x,
            top_y,
            - (right_x - left_x) * enemy_border_percent_x,
            (bottom_y - top_y) * enemy_border_percent_y
        );
    }

    _tile_background_img(img, pat_scaling) {
        // Friendly Ship background
        var tempCanvas = document.createElement("canvas"),
        tCtx = tempCanvas.getContext("2d");
        tempCanvas.width = img.width*pat_scaling;
        tempCanvas.height = img.height*pat_scaling;
        tCtx.drawImage(img,0,0,img.width,img.height,0,0,img.width*pat_scaling, img.height*pat_scaling);
        ctx.rect(left_x, top_y, game_width, game_height);
        ctx.fillStyle = ctx.createPattern(tempCanvas, "repeat");            
        ctx.fill()
    }


    _tile_enemy_background_img(img, pat_scaling) {
        // Enemy Ship background
        var ttempCanvas = document.createElement("canvas"),
        ttCtx = ttempCanvas.getContext("2d");
        ttempCanvas.width = img.width*pat_scaling;
        ttempCanvas.height = img.height*pat_scaling;
        ttCtx.drawImage(img,0,0,img.width,img.height,0,0,img.width*pat_scaling, img.height*pat_scaling);
        ctx.fillStyle = ctx.createPattern(ttempCanvas, "repeat");            
        ctx.fillRect(right_x-game_width*enemy_border_percent_x,top_y,game_width*enemy_border_percent_x,game_height*enemy_border_percent_y);
    }



    refresh(gen_graphics = false, background_image = false) {

        // make canvas black
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, width, height);

        if (background_image != false) {
            var img = new Image();
            img.src = background_image;
            img.onload = function(){
                if (gen_graphics) {
                    const pat_scaling = 0.5;
                    self._tile_background_img(img, pat_scaling);

                    const enemy_ship_ratio = (game_height*enemy_border_percent_y) /
                        (game_width * (1 - enemy_border_percent_x));
                    const enemy_pat_scaling = pat_scaling * enemy_ship_ratio;
                    self._tile_enemy_background_img(img, enemy_pat_scaling);
                    // // Friendly Ship background
                    // var tempCanvas = document.createElement("canvas"),
                    // tCtx = tempCanvas.getContext("2d");
                    // tempCanvas.width = img.width*pat_scaling;
                    // tempCanvas.height = img.height*pat_scaling;
                    // tCtx.drawImage(img,0,0,img.width,img.height,0,0,img.width*pat_scaling, img.height*pat_scaling);
                    // ctx.rect(left_x, top_y, game_width, game_height);
                    // ctx.fillStyle = ctx.createPattern(tempCanvas, "repeat");            
                    // ctx.fill()

                    // Enemy Ship background
                    // const enemy_ship_ratio = (game_height*enemy_border_percent_y) /
                    //     (game_width * (1 - enemy_border_percent_x));
                    // const enemy_pat_scaling = pat_scaling * enemy_ship_ratio;
                    // var ttempCanvas = document.createElement("canvas"),
                    // ttCtx = ttempCanvas.getContext("2d");
                    // ttempCanvas.width = img.width*enemy_pat_scaling;
                    // ttempCanvas.height = img.height*enemy_pat_scaling;
                    // ttCtx.drawImage(img,0,0,img.width,img.height,0,0,img.width*enemy_pat_scaling, img.height*enemy_pat_scaling);
                    // ctx.fillStyle = ctx.createPattern(ttempCanvas, "repeat");            
                    // ctx.fillRect(right_x-game_width*enemy_border_percent_x,top_y,game_width*enemy_border_percent_x,game_height*enemy_border_percent_y);
                } else {
                    ctx.drawImage(img,left_x,top_y,game_width,game_height);   
                };
                // Add game boarders
                self._make_game_boarder()
                self._make_enemy_boarder()
            }
        } else {
            // fill inside game boarder grey
            ctx.fillStyle = "rgb(128,128,128)";
            ctx.fillRect(left_x, top_y, right_x-left_x, bottom_y-top_y);
            // add game boarders
            this._make_game_boarder()
            this._make_enemy_boarder()
        };
    }
    
}



var imgs = ["https://storage.needpix.com/rsynced_images/blue-water-background-1469968966zou.jpg",
"https://motionarray.imgix.net/preview-271538-Xv2F78jbu7-high_0005.jpg?w=660&q=60&fit=max&auto=format",
"https://jooinn.com/images/turquoise-ocean-background-1.png",
"https://p0.pikist.com/photos/485/499/sea-background-water-surface-texture-wave-blue-summer-ocean-thumbnail.jpg",
"https://wallpapersko.com/wp-content/uploads/ktz/sea-background-nu848hra0494rxlj0l9mzohs7s9z0393jawif7zbbi.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTar3hJiyps62O6_tBi6p-P6ulxEO298gX90Ug-0lxu5haStn-t&s",
"https://www.carbonbrief.org/wp-content/uploads/2019/09/Blue-green-sea-surface-background-with-fishes-full-frame-composition-DWGX61-1550x804.jpg"];

var img_tiles = ["../assets/img/water_tiled.png"]

//myBackground = new Background();
//make_background(true, img_tiles[0]);
myBackground = new Background(gen_graphics=true, background_image=img_tiles[0]);