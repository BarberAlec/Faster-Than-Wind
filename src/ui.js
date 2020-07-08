
var hotbar = document.getElementById("hotbar");
hotbar.style.left = (right_x - left_x) * .5;
hotbar.style.bottom = 3 * top_y ;

var shoot_button = document.getElementById("shoot");
shoot_button.addEventListener ("click", function(){ship_friend.fire_cannons();});

var abandon_button = document.getElementById("abandon");
abandon_button.addEventListener ("click", function(){ship_enemy.fire_cannons();});

var background_counter = 0;

var repair_button = document.getElementById("repair");
repair_button.addEventListener ("click", function(){
    if (background_counter < (imgs.length - 1)) {
        background_counter++;
    } else {background_counter = 0}
    make_background(imgs[background_counter]);
}
);