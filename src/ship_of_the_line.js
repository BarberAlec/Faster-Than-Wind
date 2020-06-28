// This file draws some ships

make_our_ship();
make_enemy_ship();
make_cannon('18%');
make_cannon('25%');

function make_our_ship() {
    base_image_rot = new Image();
    base_image_rot.src = '../assets/img/small_boat_rot.png';
    base_image_rot.onload = function () {
        ctx.drawImage(base_image_rot, left_x, top_y, right_x - left_x-(right_x - left_x) * enemy_border_percent_x, bottom_y - top_y);
    }
}

function make_enemy_ship() {
    base_image = new Image();
    base_image.src = '../assets/img/small_boat.png';
    base_image.onload = function () {
        ctx.drawImage(base_image, right_x, top_y, -(right_x - left_x) * enemy_border_percent_x,
            (bottom_y - top_y) * enemy_border_percent_y);
    }
}

function make_cannon(topMargin) {
    var cannon_button = document.createElement("cannon");
    cannon_button.innerHTML = '<img src="../assets/img/small_cannon.png" width="130"/>';

    //cannon_button = '../assets/img/small_cannon.png';
    var body = document.getElementsByTagName("body")[0];

    body.appendChild(cannon_button);
    cannon_button.style.border = "none";
    cannon_button.style.position = "absolute";
    cannon_button.style.marginLeft = '40%';
    cannon_button.style.marginTop = topMargin;
    

    //cannon_button.style.lineHeight = "60px";
    //cannon_button.style.fontWeight = "bold";
    //cannon_button.style.background = "salmon";
    
}   